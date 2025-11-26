import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import PublicationFeed from './PublicationFeed';
import type { Publication } from '@/pages/MainApp';

interface FavoritePublicationsProps {
  publications: Publication[];
  onAddComment: (publicationId: number, comment: string) => void;
  onToggleFavorite: (publicationId: number) => void;
}

const FavoritePublications = ({
  publications,
  onAddComment,
  onToggleFavorite,
}: FavoritePublicationsProps) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Icon name="Star" className="text-primary" size={28} />
        <h2 className="text-3xl font-bold">Избранные публикации</h2>
      </div>

      {publications.length > 0 ? (
        <PublicationFeed
          publications={publications}
          onAddComment={onAddComment}
          onToggleFavorite={onToggleFavorite}
        />
      ) : (
        <Card className="border-border/50 animate-fade-in">
          <CardContent className="py-12 text-center">
            <Icon name="StarOff" className="mx-auto text-muted-foreground mb-3" size={48} />
            <p className="text-muted-foreground">У вас пока нет избранных публикаций</p>
            <p className="text-sm text-muted-foreground mt-1">
              Добавляйте публикации в избранное, нажимая на звёздочку
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FavoritePublications;
