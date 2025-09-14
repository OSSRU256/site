import { useMemo } from "react";
import ProjectCard, { Project } from "./ProjectCard";
import { SortOrder } from "./SortButton";

interface ProjectGridProps {
    projects: Project[];
    searchQuery: string;
    sortOrder: SortOrder;
    onStarToggle: (projectId: string) => void;
    isLoggedIn: boolean;
}

const ProjectGrid = ({ projects, searchQuery, sortOrder, onStarToggle, isLoggedIn }: ProjectGridProps) => {
    const filteredAndSortedProjects = useMemo(() => {
        // Filter projects
        let filtered = projects;

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = projects.filter(project =>
                project.languages.some(lang => lang.toLowerCase().includes(query)) ||
                project.tags.some(tag => tag.toLowerCase().includes(query)) ||
                project.license.toLowerCase().includes(query)
            );
        }

        // Sort projects
        let sorted = [...filtered];
        switch (sortOrder) {
            case "desc":
                sorted.sort((a, b) => b.stars - a.stars);
                break;
            case "asc":
                sorted.sort((a, b) => a.stars - b.stars);
                break;
            case "random":
                sorted = sorted.sort(() => Math.random() - 0.5);
                break;
        }

        return sorted;
    }, [projects, searchQuery, sortOrder]);

    if (filteredAndSortedProjects.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-muted-foreground text-lg mb-2">
                    {searchQuery ? "Проекты не найдены" : "Нет доступных проектов"}
                </div>
                {searchQuery && (
                    <div className="text-sm text-muted-foreground">
                        Попробуйте изменить поисковый запрос
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-min">
            {filteredAndSortedProjects.map((project) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                    onStarToggle={onStarToggle}
                    isLoggedIn={isLoggedIn}
                />
            ))}
        </div>
    );
};

export default ProjectGrid;