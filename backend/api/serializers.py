from rest_framework import serializers
from .models import AnalysisResult

class AnalysisResultSerializer(serializers.ModelSerializer):
    confidence_percentage = serializers.ReadOnlyField()
    
    class Meta:
        model = AnalysisResult
        fields = [
            'id',
            'user_email',
            'image',
            'image_hash',
            'digital_signature',
            'public_key',
            'signature_verified',
            'disease_name',
            'confidence_score',
            'confidence_percentage',
            'recommendations',
            'result',
            'status',
            'error_message',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'status', 'confidence_percentage']

class AnalysisResultListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for list views"""
    confidence_percentage = serializers.ReadOnlyField()
    
    class Meta:
        model = AnalysisResult
        fields = [
            'id',
            'user_email',
            'image',
            'disease_name',
            'confidence_percentage',
            'status',
            'created_at'
        ]
