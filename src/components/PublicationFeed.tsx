import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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

interface PublicationFeedProps {
  publications: Publication[];
  currentUser: string;
  onAddComment: (publicationId: number, comment: string) => void;
  onToggleFavorite: (publicationId: number) => void;
  onEdit: (publication: Publication) => void;
  onDelete: (publicationId: number) => void;
}

const PublicationFeed = ({ publications, currentUser, onAddComment, onToggleFavorite, onEdit, onDelete }: PublicationFeedProps) => {
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});
  const [expandedComments, setExpandedComments] = useState<Record<number, boolean>>({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [publicationToDelete, setPublicationToDelete] = useState<number | null>(null);

  const handleCommentSubmit = (publicationId: number) => {
    const comment = commentInputs[publicationId]?.trim();
    if (comment) {
      onAddComment(publicationId, comment);
      setCommentInputs({ ...commentInputs, [publicationId]: '' });
    }
  };

  const toggleComments = (publicationId: number) => {
    setExpandedComments({
      ...expandedComments,
      [publicationId]: !expandedComments[publicationId],
    });
  };

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
        <Icon name="Newspaper" className="text-primary" size={28} />
        <h2 className="text-3xl font-bold">Лента публикаций</h2>
      </div>

      {publications.map((pub) => (
        <Card key={pub.id} className="overflow-hidden border-border/50 hover:shadow-lg transition-all animate-fade-in">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {pub.author[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{pub.author}</p>
                  <p className="text-xs text-muted-foreground">
                    {pub.timestamp.toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onToggleFavorite(pub.id)}
                  className="text-primary"
                >
                  <Icon name={pub.isFavorite ? 'Star' : 'StarOff'} size={20} />
                </Button>
                {pub.author === currentUser && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Icon name="MoreVertical" size={20} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(pub)} className="gap-2">
                        <Icon name="Edit" size={16} />
                        Редактировать
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(pub.id)}
                        className="gap-2 text-destructive"
                      >
                        <Icon name="Trash2" size={16} />
                        Удалить
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            <h3 className="text-xl font-bold">{pub.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{pub.content}</p>
            {pub.image && (
              <div className="rounded-md overflow-hidden border border-border/30">
                <img
                  src={pub.image}
                  alt={pub.title}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
          </CardContent>

          <CardFooter className="flex-col items-stretch gap-3">
            <Separator />
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleComments(pub.id)}
                className="gap-2"
              >
                <Icon name="MessageSquare" size={16} />
                Комментарии ({pub.comments.length})
              </Button>
            </div>

            {expandedComments[pub.id] && (
              <div className="space-y-3 mt-2">
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {pub.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-muted/30 rounded-lg p-3 space-y-1 animate-fade-in"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-sm">{comment.author}</p>
                        <p className="text-xs text-muted-foreground">
                          {comment.timestamp.toLocaleTimeString('ru-RU', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Написать комментарий..."
                    value={commentInputs[pub.id] || ''}
                    onChange={(e) =>
                      setCommentInputs({ ...commentInputs, [pub.id]: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCommentSubmit(pub.id);
                    }}
                    className="bg-background/50"
                  />
                  <Button onClick={() => handleCommentSubmit(pub.id)} size="icon">
                    <Icon name="Send" size={16} />
                  </Button>
                </div>
              </div>
            )}
          </CardFooter>
        </Card>
      ))}

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

export default PublicationFeed;