import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Plus, Search, FileText, File, BookOpen, Tag, Calendar } from 'lucide-react';
import { Button, Card, LoadingSpinner } from './ui';
import { studentAPI, type ContentItem } from '../services/studentAPI';
import { useLoading } from '../hooks/useLoading';

const ContentLibraryPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [content, setContent] = useState<ContentItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showCreateNote, setShowCreateNote] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  
  const { isLoading, executeAsync } = useLoading();

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const contentData = await executeAsync(() => studentAPI.getContentLibrary());
      if (contentData) {
        setContent(contentData);
      }
    } catch (error) {
      console.error('Failed to load content:', error);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    for (const file of Array.from(files)) {
      try {
        // Simulate upload progress
        const uploadId = `upload-${Date.now()}-${Math.random()}`;
        setUploadProgress(prev => ({ ...prev, [uploadId]: 0 }));
        
        // Simulate progress updates
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => {
            const currentProgress = prev[uploadId] || 0;
            if (currentProgress >= 100) {
              clearInterval(progressInterval);
              return prev;
            }
            return { ...prev, [uploadId]: currentProgress + 10 };
          });
        }, 200);

        const uploadedContent = await studentAPI.uploadContent(file, 'General');
        
        setContent(prev => [uploadedContent, ...prev]);
        setUploadProgress(prev => {
          const { [uploadId]: _, ...rest } = prev;
          return rest;
        });
      } catch (error) {
        console.error('Failed to upload file:', error);
      }
    }
    
    // Clear the input
    event.target.value = '';
  };

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSubject = selectedSubject === 'all' || item.subject === selectedSubject;
    const matchesType = selectedType === 'all' || item.type === selectedType;
    
    return matchesSearch && matchesSubject && matchesType;
  });

  const subjects = Array.from(new Set(content.map(item => item.subject)));
  const types = Array.from(new Set(content.map(item => item.type)));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary-bg flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-bg">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-primary-bg/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </Button>
            <div className="h-6 w-px bg-gray-600" />
            <h1 className="text-xl font-bold text-primary-text">Content Library</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setShowCreateNote(true)}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Note
            </Button>
            
            <label className="cursor-pointer">
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt,.md"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Files
              </Button>
            </label>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search content, tags, or subjects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:border-primary-accent focus:outline-none"
            />
          </div>
          
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-gray-300 focus:border-primary-accent focus:outline-none"
          >
            <option value="all">All Subjects</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
          
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-gray-300 focus:border-primary-accent focus:outline-none"
          >
            <option value="all">All Types</option>
            {types.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        {/* Upload Progress */}
        {Object.keys(uploadProgress).length > 0 && (
          <div className="mb-6">
            {Object.entries(uploadProgress).map(([id, progress]) => (
              <div key={id} className="mb-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-400">Uploading...</span>
                  <span className="text-sm text-gray-400">{progress}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div 
                    className="bg-primary-accent h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Content Grid */}
      <main className="max-w-6xl mx-auto px-4 pb-8">
        {filteredContent.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-primary-text mb-2">
              {content.length === 0 ? 'No Content Yet' : 'No Matching Content'}
            </h2>
            <p className="text-gray-400 mb-6">
              {content.length === 0 
                ? 'Upload study materials or create notes to get started.'
                : 'Try adjusting your search terms or filters.'
              }
            </p>
            {content.length === 0 && (
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => setShowCreateNote(true)}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Create First Note
                </Button>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.txt,.md"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button variant="outline" className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Files
                  </Button>
                </label>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>

      {/* Create Note Modal */}
      {showCreateNote && (
        <CreateNoteModal
          onClose={() => setShowCreateNote(false)}
          onSave={(note) => {
            setContent(prev => [note, ...prev]);
            setShowCreateNote(false);
          }}
        />
      )}
    </div>
  );
};

interface ContentCardProps {
  item: ContentItem;
}

const ContentCard: React.FC<ContentCardProps> = ({ item }) => {
  const getIcon = () => {
    switch (item.type) {
      case 'note':
        return <FileText className="w-6 h-6 text-blue-400" />;
      case 'upload':
        return <File className="w-6 h-6 text-green-400" />;
      case 'generated':
        return <BookOpen className="w-6 h-6 text-purple-400" />;
      default:
        return <FileText className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusBadge = () => {
    if (item.processingStatus) {
      const statusColors = {
        pending: 'bg-yellow-500/20 text-yellow-300',
        processing: 'bg-blue-500/20 text-blue-300',
        completed: 'bg-green-500/20 text-green-300',
        failed: 'bg-red-500/20 text-red-300'
      };
      
      return (
        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[item.processingStatus]}`}>
          {item.processingStatus}
        </span>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
          {getIcon()}
        </div>
        <div className="flex flex-col items-end gap-2">
          {getStatusBadge()}
          <span className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300">
            {item.subject}
          </span>
        </div>
      </div>
      
      <h3 className="text-lg font-bold text-primary-text mb-2 line-clamp-2">
        {item.title}
      </h3>
      
      <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-1">
        {item.content}
      </p>
      
      {item.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.slice(0, 3).map((tag, index) => (
            <div key={index} className="flex items-center gap-1 text-xs px-2 py-1 bg-gray-800/50 rounded-full text-gray-400">
              <Tag className="w-3 h-3" />
              {tag}
            </div>
          ))}
          {item.tags.length > 3 && (
            <span className="text-xs text-gray-500">+{item.tags.length - 3} more</span>
          )}
        </div>
      )}
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {new Date(item.createdAt).toLocaleDateString()}
        </div>
        <span className="capitalize">{item.type}</span>
      </div>
    </Card>
  );
};

interface CreateNoteModalProps {
  onClose: () => void;
  onSave: (note: ContentItem) => void;
}

const CreateNoteModal: React.FC<CreateNoteModalProps> = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subject, setSubject] = useState('');
  const [tags, setTags] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !content.trim() || !subject.trim()) return;
    
    setSaving(true);
    try {
      const note = await studentAPI.createNote(
        title.trim(),
        content.trim(),
        subject.trim(),
        tags.split(',').map(tag => tag.trim()).filter(Boolean)
      );
      onSave(note);
    } catch (error) {
      console.error('Failed to create note:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-primary-bg border border-gray-700 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold text-primary-text mb-6">Create New Note</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title..."
                className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:border-primary-accent focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Mathematics, Physics, Chemistry..."
                className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:border-primary-accent focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g., algebra, equations, practice..."
                className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:border-primary-accent focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your note content here..."
                rows={10}
                className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:border-primary-accent focus:outline-none resize-none"
              />
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <Button
              onClick={handleSave}
              disabled={!title.trim() || !content.trim() || !subject.trim() || saving}
              className="flex-1"
            >
              {saving ? 'Saving...' : 'Save Note'}
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentLibraryPage;
