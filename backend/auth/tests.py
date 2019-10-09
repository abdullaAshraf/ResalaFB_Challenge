from django.test import TestCase

# Create your tests here.
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from auth.test_factories import UserFactory


class ViewTestCase(TestCase):
    """Test suite for the api views."""

    def setUp(self):
        """Define the test client and other test variables."""
        self.client = APIClient()
        self.user = UserFactory()


    def test_api_can_get_JWT_token(self):
        """Test the api can get JWT token."""
        user_data = {'username': self.user.username,'password':"password123456"}
        response = self.client.post(
            reverse('jwt_token'), user_data,
            format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_api_can_create_a_user(self):
        """Test the api has User creation capability."""
        user = UserFactory.build()
        user_data = {'username': user.username,'password':user.password}
        response = self.client.post(
            reverse('register'),user_data,
            format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


    def test_api_can_changgge_user_password(self):
        """Test the api has User password change capability."""
        self.client.force_authenticate(user=self.user)
        password_data = {'old_password': 'password123456','new_password':'hello123456'}
        response = self.client.put(
            reverse('ChangePassword'),password_data,
            format="json")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

