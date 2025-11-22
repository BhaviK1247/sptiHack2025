from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.core.files.uploadedfile import SimpleUploadedFile
import hashlib
import io
from PIL import Image

class ImageIntegrityTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        
        # Create a dummy image
        file = io.BytesIO()
        image = Image.new('RGB', (100, 100), color='red')
        image.save(file, 'jpeg')
        file.seek(0)
        self.image_content = file.read()
        
        # Calculate hash
        sha256_hash = hashlib.sha256()
        sha256_hash.update(self.image_content)
        self.valid_hash = sha256_hash.hexdigest()
        
        self.invalid_hash = 'a' * 64

    def test_upload_with_valid_hash(self):
        image = SimpleUploadedFile("test_image.jpg", self.image_content, content_type="image/jpeg")
        data = {
            'image': image,
            'image_hash': self.valid_hash
        }
        response = self.client.post('/api/analysis/', data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['status'], 'pending')

    def test_upload_with_uppercase_hash(self):
        image = SimpleUploadedFile("test_image.jpg", self.image_content, content_type="image/jpeg")
        data = {
            'image': image,
            'image_hash': self.valid_hash.upper()
        }
        response = self.client.post('/api/analysis/', data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['status'], 'pending')

    def test_upload_with_invalid_hash(self):
        image = SimpleUploadedFile("test_image.jpg", self.image_content, content_type="image/jpeg")
        data = {
            'image': image,
            'image_hash': self.invalid_hash
        }
        response = self.client.post('/api/analysis/', data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('integrity check failed', response.data['error'])
