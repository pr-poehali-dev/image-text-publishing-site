import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import type { Publication } from '@/pages/MainApp';

interface CreatePublicationProps {
  onCreatePublication: (publication: Omit<Publication, 'id' | 'timestamp' | 'comments' | 'isFavorite'>) => void;
  author: string;
}

const CreatePublication = ({ onCreatePublication, author }: CreatePublicationProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все обязательные поля',
        variant: 'destructive',
      });
      return;
    }

    onCreatePublication({
      author,
      title: title.trim(),
      content: content.trim(),
      image: imageUrl.trim() || undefined,
    });

    setTitle('');
    setContent('');
    setImageUrl('');

    toast({
      title: 'Публикация создана',
      description: 'Ваша публикация успешно добавлена в ленту',
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Icon name="PenSquare" className="text-primary" size={28} />
        <h2 className="text-3xl font-bold">Создать публикацию</h2>
      </div>

      <Card className="border-border/50 animate-fade-in">
        <CardHeader>
          <CardTitle>Новая публикация</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Заголовок *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Введите заголовок публикации"
                className="bg-background/50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Содержание *</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Напишите текст вашей публикации..."
                className="min-h-[200px] bg-background/50 resize-none"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Ссылка на изображение (необязательно)</Label>
              <Input
                id="image"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="bg-background/50"
              />
              {imageUrl && (
                <div className="rounded-md overflow-hidden border border-border/30 mt-3">
                  <img
                    src={imageUrl}
                    alt="Предпросмотр"
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="gap-2">
                <Icon name="Send" size={16} />
                Опубликовать
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setTitle('');
                  setContent('');
                  setImageUrl('');
                }}
                className="gap-2"
              >
                <Icon name="X" size={16} />
                Очистить
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="Info" className="text-primary mt-0.5" size={20} />
          <div className="space-y-1">
            <p className="font-semibold text-sm">Советы по созданию публикации:</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Используйте понятный и информативный заголовок</li>
              <li>Структурируйте текст для удобства чтения</li>
              <li>Добавьте качественное изображение для привлечения внимания</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePublication;
