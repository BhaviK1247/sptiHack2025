from django.contrib import admin
from django.utils.html import format_html
from .models import AnalysisResult

@admin.register(AnalysisResult)
class AnalysisResultAdmin(admin.ModelAdmin):
    list_display = ('id', 'image_preview', 'user_email', 'disease_name', 'confidence_display', 'status', 'created_at')
    list_filter = ('status', 'created_at', 'disease_name')
    search_fields = ('user_email', 'disease_name', 'id')
    readonly_fields = ('image_preview_large', 'created_at', 'updated_at', 'confidence_percentage')
    
    fieldsets = (
        ('User Information', {
            'fields': ('user_email',)
        }),
        ('Image', {
            'fields': ('image', 'image_preview_large')
        }),
        ('Analysis Results', {
            'fields': ('disease_name', 'confidence_score', 'confidence_percentage', 'recommendations', 'result')
        }),
        ('Status & Tracking', {
            'fields': ('status', 'error_message', 'created_at', 'updated_at')
        }),
    )
    
    actions = ['mark_as_completed', 'mark_as_failed']

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height: 60px; max-width: 60px; border-radius: 8px; object-fit: cover;" />',
                obj.image.url
            )
        return "No Image"
    image_preview.short_description = 'Preview'
    
    def image_preview_large(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height: 400px; max-width: 600px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />',
                obj.image.url
            )
        return "No Image"
    image_preview_large.short_description = 'Image Preview'

    def confidence_display(self, obj):
        if obj.confidence_score is not None:
            percentage = obj.confidence_score * 100
            color = '#22c55e' if percentage >= 80 else '#f59e0b' if percentage >= 50 else '#ef4444'
            return format_html(
                '<span style="color: {}; font-weight: bold;">{:.1f}%</span>',
                color, percentage
            )
        return "-"
    confidence_display.short_description = 'Confidence'
    
    def mark_as_completed(self, request, queryset):
        updated = queryset.update(status='completed')
        self.message_user(request, f'{updated} analysis(es) marked as completed.')
    mark_as_completed.short_description = 'Mark selected as Completed'
    
    def mark_as_failed(self, request, queryset):
        updated = queryset.update(status='failed')
        self.message_user(request, f'{updated} analysis(es) marked as failed.')
    mark_as_failed.short_description = 'Mark selected as Failed'

# Customize admin site header
admin.site.site_header = 'AgriGuard Admin Panel'
admin.site.site_title = 'AgriGuard Admin'
admin.site.index_title = 'Plant Disease Analysis Management'
