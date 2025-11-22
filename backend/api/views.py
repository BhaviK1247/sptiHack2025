from rest_framework import viewsets, status
import hashlib
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import AnalysisResult
from .serializers import AnalysisResultSerializer, AnalysisResultListSerializer
from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.primitives.asymmetric import padding
import base64

class AnalysisResultViewSet(viewsets.ModelViewSet):
    queryset = AnalysisResult.objects.all().order_by('-created_at')
    
    def get_serializer_class(self):
        if self.action == 'list':
            return AnalysisResultListSerializer
        return AnalysisResultSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Integrity Check
        image_file = request.FILES.get('image')
        provided_hash = request.data.get('image_hash')
        digital_signature = request.data.get('digital_signature')
        public_key_pem = request.data.get('public_key')

        if image_file and provided_hash:
            sha256_hash = hashlib.sha256()
            for byte_block in iter(lambda: image_file.read(4096), b""):
                sha256_hash.update(byte_block)
            calculated_hash = sha256_hash.hexdigest()
            image_file.seek(0)  # Reset file pointer

            if calculated_hash.lower() != provided_hash.lower():
                return Response(
                    {'error': 'Image integrity check failed. The image may have been tampered with.'},
                    status=status.HTTP_400_BAD_REQUEST
                )

        # Digital Signature Verification
        signature_verified = False
        if digital_signature and public_key_pem and image_file:
            try:
                # Load public key
                public_key = serialization.load_pem_public_key(
                    public_key_pem.encode()
                )
                
                # Read file data
                image_file.seek(0)
                file_data = image_file.read()
                image_file.seek(0) # Reset again
                
                # Convert hex signature back to bytes
                signature_bytes = bytes.fromhex(digital_signature)
                
                public_key.verify(
                    signature_bytes,
                    file_data,
                    padding.PSS(
                        mgf=padding.MGF1(hashes.SHA256()),
                        salt_length=32
                    ),
                    hashes.SHA256()
                )
                signature_verified = True
            except Exception as e:
                print(f"Signature verification failed: {e}")
                # We can choose to fail the request or just mark as unverified
                pass

        self.perform_create(serializer)
        
        instance = serializer.instance
        instance.status = 'processing'
        instance.signature_verified = signature_verified
        instance.save()
        
        # TODO: Integrate ML model here
        # Example:
        # try:
        #     from .ml_model import predict_disease
        #     result = predict_disease(instance.image.path)
        #     instance.disease_name = result['disease']
        #     instance.confidence_score = result['confidence']
        #     instance.recommendations = result['recommendations']
        #     instance.result = result
        #     instance.status = 'completed'
        # except Exception as e:
        #     instance.status = 'failed'
        #     instance.error_message = str(e)
        # finally:
        #     instance.save()
        
        # For now, simulate processing
        instance.disease_name = "Disease detection in progress"
        instance.status = 'pending'
        instance.save()
        
        headers = self.get_success_headers(serializer.data)
        return Response(
            AnalysisResultSerializer(instance).data,
            status=status.HTTP_201_CREATED,
            headers=headers
        )
    
    @action(detail=True, methods=['post'])
    def reprocess(self, request, pk=None):
        """Endpoint to reprocess an existing analysis"""
        instance = self.get_object()
        instance.status = 'processing'
        instance.save()
        
        # TODO: Call ML model again
        # Similar to create method above
        
        return Response({
            'status': 'reprocessing',
            'message': 'Analysis has been queued for reprocessing'
        })
    
    @action(detail=False, methods=['get'])
    def recent(self, request):
        """Get recent analyses"""
        recent_analyses = self.queryset[:10]
        serializer = self.get_serializer(recent_analyses, many=True)
        return Response(serializer.data)
