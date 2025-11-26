import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import Icon from '@/components/ui/icon';
import type { Publication } from '@/pages/MainApp';

interface UserProfileProps {
  user: { username: string; email: string };
  publications: Publication[];
  onEdit: (publication: Publication) => void;
  onDelete: (publicationId: number) => void;
}

const UserProfile = ({ user, publications, onEdit, onDelete }: UserProfileProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [publicationToDelete, setPublicationToDelete] = useState<number | null>(null);
  const userPublications = publications.filter((pub) => pub.author === user.username);
  const totalComments = publications.reduce((acc, pub) => acc + pub.comments.length, 0);

  const handleDeleteClick = (publicationId: number) => {
    setPublicationToDelete(publicationId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (publicationToDelete) {
      onDelete(publicationToDelete);
      setPublicationToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Icon name="User" className="text-primary" size={28} />
        <h2 className="text-3xl font-bold">Профиль пользователя</h2>
      </div>

      <Card className="border-border/50 animate-fade-in">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-4 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-3xl">
                {user.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-2xl">{user.username}</CardTitle>
              <p className="text-muted-foreground">{user.email}</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary" className="gap-1">
                  <Icon name="Calendar" size={12} />
                  Пользователь с ноября 2024
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card className="border-border/50 text-center animate-fade-in">
          <CardContent className="pt-6">
            <Icon name="FileText" className="mx-auto text-primary mb-2" size={32} />
            <p className="text-3xl font-bold">{userPublications.length}</p>
            <p className="text-sm text-muted-foreground">Публикаций</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 text-center animate-fade-in">
          <CardContent className="pt-6">
            <Icon name="MessageSquare" className="mx-auto text-primary mb-2" size={32} />
            <p className="text-3xl font-bold">{totalComments}</p>
            <p className="text-sm text-muted-foreground">Комментариев</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 text-center animate-fade-in">
          <CardContent className="pt-6">
            <Icon name="Star" className="mx-auto text-primary mb-2" size={32} />
            <p className="text-3xl font-bold">{publications.filter((p) => p.isFavorite).length}</p>
            <p className="text-sm text-muted-foreground">Избранных</p>
          </CardContent>
        </Card>
      </div>

      {userPublications.length > 0 && (
        <Card className="border-border/50 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="BookOpen" size={20} />
              Мои публикации
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {userPublications.map((pub, index) => (
              <div key={pub.id}>
                {index > 0 && <Separator className="my-3" />}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h4 className="font-semibold">{pub.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {pub.content}
                      </p>
                    </div>
                    {pub.image && (
                      <img
                        src={pub.image}
                        alt={pub.title}
                        className="w-24 h-24 object-cover rounded border border-border/30"
                      />
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Icon name="Calendar" size={12} />
                        {pub.timestamp.toLocaleDateString('ru-RU')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="MessageSquare" size={12} />
                        {pub.comments.length} комментариев
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(pub)}
                        className="gap-1"
                      >
                        <Icon name="Edit" size={14} />
                        Редактировать
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteClick(pub.id)}
                        className="gap-1 text-destructive hover:text-destructive"
                      >
                        <Icon name="Trash2" size={14} />
                        Удалить
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {userPublications.length === 0 && (
        <Card className="border-border/50 animate-fade-in">
          <CardContent className="py-12 text-center">
            <Icon name="FileX" className="mx-auto text-muted-foreground mb-3" size={48} />
            <p className="text-muted-foreground">У вас пока нет публикаций</p>
            <p className="text-sm text-muted-foreground mt-1">
              Начните делиться своими мыслями и идеями!
            </p>
          </CardContent>
        </Card>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить публикацию?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Публикация будет удалена навсегда.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserProfile;