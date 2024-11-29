from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.utils import timezone
from .models import CustomUser, Task
from .serializers import CustomUserSerializer, TaskSerializer
from django.contrib.auth import get_user_model

# MODEL TESTS

# CUSTOM USER

class CustomUserManagerTestCase(TestCase):
    def test_create_user(self):
        User = get_user_model()
        user = User.objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='password123'
        )
        self.assertEqual(user.username, 'testuser')
        self.assertEqual(user.email, 'testuser@example.com')
        self.assertTrue(user.check_password('password123'))
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_create_user_no_username(self):
        User = get_user_model()
        with self.assertRaises(ValueError):
            User.objects.create_user(
                username='',
                email='testuser@example.com',
                password='password123'
            )

    def test_create_superuser(self):
        User = get_user_model()
        admin_user = User.objects.create_superuser(
            username='adminuser',
            email='adminuser@example.com',
            password='adminpassword123'
        )
        self.assertEqual(admin_user.username, 'adminuser')
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.is_superuser)

# TASK

class TaskModelTestCase(TestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(
            username='taskuser',
            email='taskuser@example.com',
            password='password123'
        )
        self.task = Task.objects.create(
            user=self.user,
            title='Test Task',
            description='Test task description',
            due_date=timezone.now().date() - timezone.timedelta(days=1)  # Yesterday date
        )

    def test_task_str(self):
        self.assertEqual(str(self.task), 'Test Task')

    def test_is_missed_true(self):
        self.assertTrue(self.task.is_missed)

    def test_is_missed_false(self):
        self.task.due_date = timezone.now().date() + timezone.timedelta(days=1)  # Tomorrow date
        self.task.save()
        self.assertFalse(self.task.is_missed)


# SERIALIZER TESTS

class CustomUserSerializerTestCase(TestCase):
    def setUp(self):
        self.user_data = {
            'username': 'serializeruser',
            'email': 'serializeruser@example.com',
            'password': 'password123'
        }
        self.serializer = CustomUserSerializer(data=self.user_data)

    def test_serializer_valid(self):
        self.assertTrue(self.serializer.is_valid())

    def test_create_user(self):
        self.serializer.is_valid()
        user = self.serializer.save()
        self.assertEqual(user.username, self.user_data['username'])
        self.assertEqual(user.email, self.user_data['email'])
        self.assertTrue(user.check_password(self.user_data['password']))

class TaskSerializerTestCase(TestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(
            username='taskserializeruser',
            email='taskserializeruser@example.com',
            password='password123'
        )
        self.task_data = {
            'user': self.user.id,
            'title': 'Serializer Task',
            'description': 'Task for serializer testing',
            'due_date': (timezone.now().date() + timezone.timedelta(days=5)).strftime('%Y-%m-%d')  
        }
        self.serializer = TaskSerializer(data=self.task_data)

    def test_serializer_valid(self):
        is_valid = self.serializer.is_valid()
        if not is_valid:
            print(self.serializer.errors)
        self.assertTrue(is_valid)

    def test_create_task(self):
        self.serializer.is_valid()
        task = self.serializer.save()
        self.assertEqual(task.title, self.task_data['title'])
        self.assertEqual(task.user, self.user)

# API tests

class UserRegistrationTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('user-register')
        self.user_data = {
            'username': 'newuser',
            'email': 'newuser@example.com',
            'password': 'password123'
        }

    def test_user_registration(self):
        response = self.client.post(self.url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(CustomUser.objects.count(), 1)
        self.assertEqual(CustomUser.objects.get().username, 'newuser')

class UserLoginTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create_user(
            username='loginuser',
            email='loginuser@example.com',
            password='password123'
        )
        self.url = reverse('user-login')

    def test_user_login(self):
        response = self.client.post(self.url, {
            'username': 'loginuser',
            'password': 'password123'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

class TokenRefreshTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create_user(
            username='refreshuser',
            email='refreshuser@example.com',
            password='password123'
        )
        self.login_url = reverse('user-login')
        self.refresh_url = reverse('refresh-token')
        login_response = self.client.post(self.login_url, {
            'username': 'refreshuser',
            'password': 'password123'
        }, format='json')
        self.refresh_token = login_response.data['refresh']

    def test_token_refresh(self):
        response = self.client.post(self.refresh_url, {
            'refresh': self.refresh_token
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)

class TaskListViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create_user(
            username='tasklistuser',
            email='tasklistuser@example.com',
            password='password123'
        )
        self.client.force_authenticate(user=self.user)
        self.task = Task.objects.create(
            user=self.user,
            title='Task 1',
            description='First task'
        )
        self.url = reverse('task-list')

    def test_get_task_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Task 1')

class TaskListViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create_user(
            username='tasklistuser',
            email='tasklistuser@example.com',
            password='password123'
        )
        self.client.force_authenticate(user=self.user)
        self.task = Task.objects.create(
            user=self.user,
            title='Task 1',
            description='First task'
        )
        self.url = reverse('task-list')

    def test_get_task_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Task 1')

class TaskCreateViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create_user(
            username='taskcreateuser',
            email='taskcreateuser@example.com',
            password='password123'
        )
        self.client.force_authenticate(user=self.user)
        self.url = reverse('task-create')
        self.task_data = {
            'title': 'New Task',
            'description': 'Creating a new task',
            'due_date': (timezone.now().date() + timezone.timedelta(days=3)).strftime('%Y-%m-%d') 
        }

    def test_create_task(self):
        response = self.client.post(self.url, self.task_data, format='json')
        if response.status_code != status.HTTP_201_CREATED:
            print(response.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Task.objects.count(), 1)
        self.assertEqual(Task.objects.get().title, 'New Task')

class TaskCompleteViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create_user(
            username='taskcompleteuser',
            email='taskcompleteuser@example.com',
            password='password123'
        )
        self.client.force_authenticate(user=self.user)
        self.task = Task.objects.create(
            user=self.user,
            title='Incompleted Task',
            description='This task is incompleted'
        )
        self.url = reverse('task-complete', kwargs={'pk': self.task.pk})

    def test_complete_task(self):
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.task.refresh_from_db()
        self.assertTrue(self.task.is_completed)
        self.assertIsNotNone(self.task.completed_at)

class TaskDeleteViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create_user(
            username='taskdeleteuser',
            email='taskdeleteuser@example.com',
            password='password123'
        )
        self.client.force_authenticate(user=self.user)
        self.task = Task.objects.create(
            user=self.user,
            title='Task to Delete',
            description='This task will be deleted'
        )
        self.url = reverse('task-delete', kwargs={'pk': self.task.pk})

    def test_delete_task(self):
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Task.objects.filter(pk=self.task.pk).exists())
