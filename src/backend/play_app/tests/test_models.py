# backend/play_app/tests/test_models.py]

import pytest
from mixer.backend.django import mixer

#Write to db during tests enable
pytestmark = pytest.mark.django_db

def test_message():
	obj = mixer.blend('play_app.Message')
	assert obj.pk > 0