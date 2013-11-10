from django.db import models
from django.core.exceptions import ObjectDoesNotExist

class SmileRedirect(models.Model):
    time = models.DateTimeField()
