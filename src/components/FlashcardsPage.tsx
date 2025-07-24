import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, RotateCcw, ChevronLeft, ChevronRight, Plus, Eye, BookOpen } from 'lucide-react';
import { Button, Card, LoadingSpinner } from './ui';
import { studentAPI, type FlashcardDeck, type Flashcard } from '../services/studentAPI';
import { useLoading } from '../hooks/useLoading';

const FlashcardsPage: React.FC = () => {
  const navigate = useNavigate();
  const { deckId } = useParams<{ deckId: string }>();
  
  const [decks, setDecks] = useState<FlashcardDeck[]>([]);
  const [currentDeck, setCurrentDeck] = useState<FlashcardDeck | null>(null);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  
  const { isLoading, executeAsync } = useLoading();

  useEffect(() => {
    if (deckId) {
      loadDeckCards();
    } else {
      loadDecks();
    }
  }, [deckId]);

  const loadDecks = async () => {
    try {
      const decksData = await executeAsync(() => studentAPI.getFlashcardDecks('user-123'));
      if (decksData) {
        setDecks(decksData);
      }
    } catch (error) {
      console.error('Failed to load flashcard decks:', error);
    }
  };

  const loadDeckCards = async () => {
    if (!deckId) return;
    
    try {
      const [decksData, cardsData] = await Promise.all([
        executeAsync(() => studentAPI.getFlashcardDecks('user-123')),
        executeAsync(() => studentAPI.getDeckCards(deckId))
      ]);
      
      if (decksData) {
        setDecks(decksData);
        const deck = decksData.find(d => d.id === deckId);
        if (deck) {
          setCurrentDeck(deck);
        }
      }
      
      if (cardsData) {
        setCards(cardsData);
        setCurrentCardIndex(0);
        setShowAnswer(false);
        setReviewMode(true);
      }
    } catch (error) {
      console.error('Failed to load deck cards:', error);
    }
  };

  const handleCardReview = async (difficulty: 'easy' | 'medium' | 'hard') => {
    if (!cards[currentCardIndex]) return;
    
    try {
      await studentAPI.reviewCard(cards[currentCardIndex].id, difficulty);
      
      // Move to next card or finish review
      if (currentCardIndex < cards.length - 1) {
        setCurrentCardIndex(prev => prev + 1);
        setShowAnswer(false);
      } else {
        // Review complete
        setReviewMode(false);
        // Could show completion screen here
        navigate('/flashcards');
      }
    } catch (error) {
      console.error('Failed to review card:', error);
    }
  };

  const nextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setShowAnswer(false);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
      setShowAnswer(false);
    }
  };

  const resetDeck = () => {
    setCurrentCardIndex(0);
    setShowAnswer(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary-bg flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Deck Selection View
  if (!reviewMode) {
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
              <h1 className="text-xl font-bold text-primary-text">Flashcards</h1>
            </div>
            
            <Button
              onClick={() => {/* TODO: Implement create deck */}}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Deck
            </Button>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {decks.map((deck) => (
              <div 
                key={deck.id}
                className="cursor-pointer"
                onClick={() => navigate(`/flashcards/${deck.id}`)}
              >
                <Card className="p-6 hover:border-gray-600 transition-colors h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-primary-accent/20 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-primary-accent" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">{deck.cardCount} cards</div>
                      <div className="text-xs text-gray-500">
                        {deck.masteryLevel}% mastery
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-primary-text mb-2">
                    {deck.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {deck.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300">
                      {deck.subject}
                    </span>
                    <span className="text-xs text-gray-500">
                      {deck.createdBy === 'ai' ? 'AI Generated' : 'Your Deck'}
                    </span>
                  </div>
                  
                  {deck.lastReviewed && (
                    <div className="mt-3 text-xs text-gray-500">
                      Last reviewed: {new Date(deck.lastReviewed).toLocaleDateString()}
                    </div>
                  )}
                  
                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div 
                        className="bg-primary-accent h-2 rounded-full transition-all duration-300"
                        style={{ width: `${deck.masteryLevel}%` }}
                      />
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
          
          {decks.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-xl font-bold text-primary-text mb-2">
                No Flashcard Decks Yet
              </h2>
              <p className="text-gray-400 mb-6">
                Create your first flashcard deck or let AI generate one based on your study materials.
              </p>
              <Button
                onClick={() => {/* TODO: Implement create deck */}}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Your First Deck
              </Button>
            </div>
          )}
        </main>
      </div>
    );
  }

  // Review Mode
  const currentCard = cards[currentCardIndex];
  
  if (!currentCard || !currentDeck) {
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
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/flashcards')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              All Decks
            </Button>
            <div className="h-6 w-px bg-gray-600" />
            <div>
              <h1 className="font-semibold text-primary-text">{currentDeck.title}</h1>
              <p className="text-sm text-gray-400">{currentDeck.subject}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={resetDeck}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
            <div className="text-sm text-gray-400">
              {currentCardIndex + 1} / {cards.length}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div 
            className="bg-primary-accent h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentCardIndex + 1) / cards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="relative">
          <div 
            className="cursor-pointer"
            onClick={() => setShowAnswer(!showAnswer)}
          >
            <Card className={`p-8 min-h-[400px] transition-all duration-300 ${
              showAnswer ? 'bg-primary-accent/5 border-primary-accent/20' : ''
            }`}>
              <div className="flex flex-col justify-center items-center h-full text-center">
                {!showAnswer ? (
                  <>
                    <div className="mb-4">
                      <span className="text-xs px-3 py-1 bg-gray-800 rounded-full text-gray-400">
                        Question
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-primary-text mb-6">
                      {currentCard.front}
                    </h2>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">Click to reveal answer</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-4">
                      <span className="text-xs px-3 py-1 bg-primary-accent/20 text-primary-accent rounded-full">
                        Answer
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-primary-text mb-6">
                      {currentCard.back}
                    </h2>
                    <div className="text-gray-400 text-sm mb-8">
                      How well did you know this?
                    </div>
                    
                    {/* Review Buttons */}
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardReview('hard');
                        }}
                        className="border-red-600 text-red-400 hover:bg-red-600/10"
                      >
                        Hard
                      </Button>
                      <Button
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardReview('medium');
                        }}
                        className="border-yellow-600 text-yellow-400 hover:bg-yellow-600/10"
                      >
                        Medium
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardReview('easy');
                        }}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Easy
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </Card>
          </div>
          
          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={prevCard}
              disabled={currentCardIndex === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <Button
              variant="outline"
              onClick={nextCard}
              disabled={currentCardIndex === cards.length - 1}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FlashcardsPage;
