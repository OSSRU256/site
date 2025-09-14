import { useState } from "react";
import { Star, ExternalLink, Github, ChevronDown, ChevronUp, GitCommit, AlertCircle, GitPullRequest } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Project {
    id: string;
    name: string;
    description: string;
    stars: number;
    isStarred: boolean;
    languages: string[];
    license: string;
    tags: string[];
    hasCodeStyle: boolean;
    hasContributionGuide: boolean;
    flow: string;
    githubUrl: string;
    websiteUrl?: string;
    issues: number;
    commits: number;
    pullRequests: number;
}

interface ProjectCardProps {
    project: Project;
    onStarToggle: (projectId: string) => void;
    isLoggedIn: boolean;
}

const ProjectCard = ({ project, onStarToggle, isLoggedIn }: ProjectCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleCardClick = (e: React.MouseEvent) => {
        // Don't expand if clicking on interactive elements
        if ((e.target as HTMLElement).closest('button, a')) {
            return;
        }
        setIsExpanded(!isExpanded);
    };

    const handleStarClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isLoggedIn) {
            onStarToggle(project.id);
        }
    };

    return (
        <div
            className={`bg-card border border-border rounded-lg p-4 hover:bg-card-hover cursor-pointer transition-all duration-300 ${
                isExpanded ? 'row-span-2' : ''
            }`}
            onClick={handleCardClick}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-card-foreground truncate flex-1 mr-2">
                    {project.name}
                </h3>
                <div className="flex items-center gap-1 flex-shrink-0">
                    {isLoggedIn && (
                        <button
                            onClick={handleStarClick}
                            className="p-1 hover:bg-accent/50 rounded transition-colors"
                        >
                            <Star
                                className={`h-4 w-4 ${
                                    project.isStarred
                                        ? 'fill-star-filled text-star-filled'
                                        : 'text-star-empty hover:text-star-filled'
                                }`}
                            />
                        </button>
                    )}
                    <span className="text-sm text-muted-foreground font-medium">
            {project.stars}
          </span>
                </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {project.description}
            </p>

            {/* Languages and License */}
            <div className="flex flex-wrap gap-1 mb-2">
                {project.languages.slice(0, 3).map((lang) => (
                    <Badge
                        key={lang}
                        variant="secondary"
                        className="text-xs bg-tag-bg text-tag-text border-0"
                    >
                        {lang}
                    </Badge>
                ))}
                {project.languages.length > 3 && (
                    <Badge variant="secondary" className="text-xs bg-tag-bg text-tag-text border-0">
                        +{project.languages.length - 3}
                    </Badge>
                )}
            </div>

            <div className="flex items-center justify-between mb-3">
                <div className="text-xs text-muted-foreground">
                    Лицензия: {project.license}
                </div>

                {/* Project Stats */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        <span>{project.issues}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <GitCommit className="h-3 w-3" />
                        <span>{project.commits}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <GitPullRequest className="h-3 w-3" />
                        <span>{project.pullRequests}</span>
                    </div>
                </div>
            </div>

            {/* Expand Indicator */}
            <div className="flex justify-center">
                {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
            </div>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="mt-4 pt-4 border-t border-border animate-in slide-in-from-top-2 duration-300">
                    {/* Tags */}
                    <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Технологии:</h4>
                        <div className="flex flex-wrap gap-1">
                            {project.tags.map((tag) => (
                                <Badge
                                    key={tag}
                                    variant="outline"
                                    className="text-xs border-accent/50 text-accent-foreground"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Project Info */}
                    <div className="space-y-2 mb-4 text-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Code Style:</span>
                            <span className={project.hasCodeStyle ? "text-success" : "text-muted-foreground"}>
                {project.hasCodeStyle ? "Есть" : "Нет"}
              </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Правила контрибьюции:</span>
                            <span className={project.hasContributionGuide ? "text-success" : "text-muted-foreground"}>
                {project.hasContributionGuide ? "Есть" : "Нет"}
              </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Flow:</span>
                            <span className="text-card-foreground font-medium">{project.flow}</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open(project.githubUrl, '_blank');
                            }}
                        >
                            <Github className="h-4 w-4 mr-2" />
                            GitHub
                        </Button>
                        {project.websiteUrl && (
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 border-border hover:bg-accent/50"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(project.websiteUrl, '_blank');
                                }}
                            >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Сайт
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectCard;