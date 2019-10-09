from django.contrib.auth.models import User
import factory


class UserFactory(factory.django.DjangoModelFactory):
    """Creates test user"""
    class Meta:
        model = User

    username = factory.Sequence(lambda n: 'user{}'.format(n))
    # call set_password method on the generated User
    password = factory.PostGenerationMethodCall('set_password','password123456')