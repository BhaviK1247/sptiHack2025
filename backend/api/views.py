from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import AnalysisResult
from .serializers import AnalysisResultSerializer, AnalysisResultListSerializer

class AnalysisResultViewSet(viewsets.ModelViewSet):
    queryset = AnalysisResult.objects.all().order_by('-created_at')
    
    def get_serializer_class(self):
        if self.action == 'list':
            return AnalysisResultListSerializer
        return AnalysisResultSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        instance = serializer.instance
        instance.status = 'processing'
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
