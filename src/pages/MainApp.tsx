import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import PublicationFeed from '@/components/PublicationFeed';
import CreatePublication from '@/components/CreatePublication';
import UserProfile from '@/components/UserProfile';
import SearchPublications from '@/components/SearchPublications';
import FavoritePublications from '@/components/FavoritePublications';

interface MainAppProps {
  user: { username: string; email: string };
  onLogout: () => void;
}

export interface Publication {
  id: number;
  author: string;
  title: string;
  content: string;
  image?: string;
  timestamp: Date;
  comments: Comment[];
  isFavorite?: boolean;
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: Date;
}

const MainApp = ({ user, onLogout }: MainAppProps) => {
  const [currentView, setCurrentView] = useState<'feed' | 'create' | 'profile' | 'search' | 'favorites'>('feed');
  const [publications, setPublications] = useState<Publication[]>([
    {
      id: 1,
      author: 'Иван Петров',
      title: 'История железных дорог России',
      content: 'Российские железные дороги имеют богатую историю, начиная с первой железнодорожной линии между Санкт-Петербургом и Царским Селом...',
      image: 'https://cdn.poehali.dev/projects/1afbb65f-672b-49af-846a-c06aee32b713/files/922207af-68c8-4b77-bcc7-79117cbe322b.jpg',
      timestamp: new Date('2024-11-20'),
      comments: [
        {
          id: 1,
          author: 'Мария Сидорова',
          content: 'Очень интересная статья! Спасибо за информацию.',
          timestamp: new Date('2024-11-21'),
        },
      ],
      isFavorite: false,
    },
    {
      id: 2,
      author: 'Алексей Смирнов',
      title: 'Современные технологии на железной дороге',
      content: 'Инновации в железнодорожной индустрии: от высокоскоростных поездов до автоматизированных систем управления движением...',
      image: 'https://cdn.poehali.dev/projects/1afbb65f-672b-49af-846a-c06aee32b713/files/60bc35ab-844b-4c31-b64c-aa07e5ea8b2c.jpg',
      timestamp: new Date('2024-11-22'),
      comments: [],
      isFavorite: false,
    },
    {
      id: 3,
      author: 'Ольга Кузнецова',
      title: 'Безопасность на железнодорожном транспорте',
      content: 'Обзор современных систем безопасности и мер предосторожности при эксплуатации железнодорожного транспорта...',
      image: 'https://cdn.poehali.dev/projects/1afbb65f-672b-49af-846a-c06aee32b713/files/85a90499-fc1d-43ea-a8c6-f9e545d1ced9.jpg',
      timestamp: new Date('2024-11-23'),
      comments: [],
      isFavorite: false,
    },
  ]);

  const handleCreatePublication = (newPub: Omit<Publication, 'id' | 'timestamp' | 'comments' | 'isFavorite'>) => {
    const publication: Publication = {
      ...newPub,
      id: publications.length + 1,
      timestamp: new Date(),
      comments: [],
      isFavorite: false,
    };
    setPublications([publication, ...publications]);
    setCurrentView('feed');
  };

  const handleAddComment = (publicationId: number, comment: string) => {
    setPublications(
      publications.map((pub) =>
        pub.id === publicationId
          ? {
              ...pub,
              comments: [
                ...pub.comments,
                {
                  id: pub.comments.length + 1,
                  author: user.username,
                  content: comment,
                  timestamp: new Date(),
                },
              ],
            }
          : pub
      )
    );
  };

  const handleToggleFavorite = (publicationId: number) => {
    setPublications(
      publications.map((pub) =>
        pub.id === publicationId ? { ...pub, isFavorite: !pub.isFavorite } : pub
      )
    );
  };

  const favoritePublications = publications.filter((pub) => pub.isFavorite);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Train" className="text-primary" size={32} />
              <h1 className="text-2xl font-bold tracking-wider">RAILWAY</h1>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant={currentView === 'search' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setCurrentView('search')}
              >
                <Icon name="Search" size={20} />
              </Button>

              <div className="flex items-center gap-2 bg-background/50 rounded-full px-3 py-1.5">
                <Avatar className="h-8 w-8 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {user.username[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{user.username}</span>
              </div>

              <Button variant="ghost" size="icon" onClick={onLogout}>
                <Icon name="LogOut" size={20} />
              </Button>
            </div>
          </div>

          <nav className="flex gap-2 mt-4">
            <Button
              variant={currentView === 'feed' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCurrentView('feed')}
              className="gap-2"
            >
              <Icon name="Home" size={16} />
              Главная
            </Button>
            <Button
              variant={currentView === 'create' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCurrentView('create')}
              className="gap-2"
            >
              <Icon name="PenSquare" size={16} />
              Создать
            </Button>
            <Button
              variant={currentView === 'favorites' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCurrentView('favorites')}
              className="gap-2"
            >
              <Icon name="Star" size={16} />
              Избранное ({favoritePublications.length})
            </Button>
            <Button
              variant={currentView === 'profile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCurrentView('profile')}
              className="gap-2"
            >
              <Icon name="User" size={16} />
              Профиль
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {currentView === 'feed' && (
          <PublicationFeed
            publications={publications}
            onAddComment={handleAddComment}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
        {currentView === 'create' && (
          <CreatePublication onCreatePublication={handleCreatePublication} author={user.username} />
        )}
        {currentView === 'profile' && <UserProfile user={user} publications={publications} />}
        {currentView === 'search' && <SearchPublications publications={publications} />}
        {currentView === 'favorites' && (
          <FavoritePublications
            publications={favoritePublications}
            onAddComment={handleAddComment}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </main>
    </div>
  );
};

export default MainApp;
