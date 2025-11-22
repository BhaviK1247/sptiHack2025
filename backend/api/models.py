from django.db import models

class AnalysisResult(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]
    
    # User info
    user_email = models.EmailField(blank=True, null=True)
    
    # Image
    image = models.ImageField(upload_to='uploads/%Y/%m/%d/')
    
    # ML Results
    disease_name = models.CharField(max_length=200, blank=True, null=True)
    confidence_score = models.FloatField(blank=True, null=True, help_text="Confidence score (0-1)")
    recommendations = models.TextField(blank=True, null=True)
    result = models.JSONField(null=True, blank=True, help_text="Full ML model output")
    
    # Status tracking
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    error_message = models.TextField(blank=True, null=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Plant Analysis'
        verbose_name_plural = 'Plant Analyses'

    def __str__(self):
        return f"Analysis #{self.id} - {self.disease_name or 'Unknown'} ({self.status})"
    
    @property
    def confidence_percentage(self):
        if self.confidence_score:
            return f"{self.confidence_score * 100:.2f}%"
        return "N/A"
