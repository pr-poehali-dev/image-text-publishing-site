import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import type { Publication } from '@/pages/MainApp';

interface SearchPublicationsProps {
  publications: Publication[];
}

const SearchPublications = ({ publications }: SearchPublicationsProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPublications = publications.filter(
    (pub) =>
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Icon name="Search" className="text-primary" size={28} />
        <h2 className="text-3xl font-bold">Поиск публикаций</h2>
      </div>

      <Card className="border-border/50 animate-fade-in">
        <CardContent className="pt-6">
          <div className="relative">
            <Icon
              name="Search"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={20}
            />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по заголовку, содержанию или автору..."
              className="pl-10 bg-background/50"
            />
          </div>
        </CardContent>
      </Card>

      {searchQuery && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="Filter" size={16} />
          <span>
            Найдено результатов: <strong className="text-foreground">{filteredPublications.length}</strong>
          </span>
        </div>
      )}

      <div className="space-y-4">
        {filteredPublications.map((pub) => (
          <Card
            key={pub.id}
            className="overflow-hidden border-border/50 hover:shadow-lg transition-all animate-fade-in cursor-pointer"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {pub.author[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg truncate">{pub.title}</h3>
                      <p className="text-sm text-muted-foreground">{pub.author}</p>
                    </div>
                    {pub.image && (
                      <img
                        src={pub.image}
                        alt={pub.title}
                        className="w-20 h-20 object-cover rounded border border-border/30 flex-shrink-0"
                      />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{pub.content}</p>
                  <div className="flex items-center gap-3 mt-3 flex-wrap">
                    <Badge variant="secondary" className="gap-1">
                      <Icon name="Calendar" size={12} />
                      {pub.timestamp.toLocaleDateString('ru-RU')}
                    </Badge>
                    <Badge variant="secondary" className="gap-1">
                      <Icon name="MessageSquare" size={12} />
                      {pub.comments.length}
                    </Badge>
                    {pub.isFavorite && (
                      <Badge variant="default" className="gap-1">
                        <Icon name="Star" size={12} />
                        Избранное
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {searchQuery && filteredPublications.length === 0 && (
        <Card className="border-border/50 animate-fade-in">
          <CardContent className="py-12 text-center">
            <Icon name="SearchX" className="mx-auto text-muted-foreground mb-3" size={48} />
            <p className="text-muted-foreground">По вашему запросу ничего не найдено</p>
            <p className="text-sm text-muted-foreground mt-1">
              Попробуйте изменить поисковый запрос
            </p>
          </CardContent>
        </Card>
      )}

      {!searchQuery && (
        <Card className="border-border/50 animate-fade-in">
          <CardContent className="py-12 text-center">
            <Icon name="Search" className="mx-auto text-muted-foreground mb-3" size={48} />
            <p className="text-muted-foreground">Введите запрос для поиска публикаций</p>
            <p className="text-sm text-muted-foreground mt-1">
              Вы можете искать по заголовку, содержанию или автору
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchPublications;
