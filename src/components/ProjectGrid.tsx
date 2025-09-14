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
            // Extract tags from search query (tags start with #)
            const hashTags = searchQuery.match(/#(\w+)/g)?.map(tag => tag.substring(1).toLowerCase()) || [];
            // Extract regular search terms (not starting with #)
            const regularTerms = searchQuery.replace(/#\w+/g, '').trim().toLowerCase();

            filtered = projects.filter(project => {
                // Check if all hash tags match
                const hashTagsMatch = hashTags.length === 0 || hashTags.every(hashTag =>
                    project.languages.some(lang => lang.toLowerCase().includes(hashTag)) ||
                    project.tags.some(tag => tag.toLowerCase().includes(hashTag)) ||
                    project.license.toLowerCase().includes(hashTag)
                );

                // Check if regular terms match
                const regularTermsMatch = !regularTerms ||
                    project.languages.some(lang => lang.toLowerCase().includes(regularTerms)) ||
                    project.tags.some(tag => tag.toLowerCase().includes(regularTerms)) ||
                    project.license.toLowerCase().includes(regularTerms);

                return hashTagsMatch && regularTermsMatch;
            });
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