import { useState } from "react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";
import SortButton, { SortOrder } from "@/components/SortButton";
import ProjectGrid from "@/components/ProjectGrid";
import { Project } from "@/components/ProjectCard";

// Mock data - в реальном проекте это будет приходить с API
const mockProjects: Project[] = [
    {
        id: "1",
        name: "React Component Library",
        description: "Современная библиотека React компонентов с поддержкой TypeScript и темной темы. Включает более 50 готовых компонентов для быстрой разработки.",
        stars: 1542,
        isStarred: true,
        languages: ["TypeScript", "React", "CSS"],
        license: "MIT",
        tags: ["ui", "components", "typescript", "react", "design-system"],
        hasCodeStyle: true,
        hasContributionGuide: true,
        flow: "Trunk-Based",
        githubUrl: "https://github.com/example/react-component-library",
        websiteUrl: "https://components.example.com",
        issues: 23,
        commits: 342,
        pullRequests: 12
    },
    {
        id: "2",
        name: "GraphQL API Generator",
        description: "Автоматическая генерация GraphQL API из существующих баз данных. Поддерживает PostgreSQL, MySQL и MongoDB.",
        stars: 892,
        isStarred: false,
        languages: ["Node.js", "GraphQL", "JavaScript"],
        license: "Apache 2.0",
        tags: ["graphql", "api", "generator", "database", "nodejs"],
        hasCodeStyle: true,
        hasContributionGuide: false,
        flow: "Git Flow",
        githubUrl: "https://github.com/example/graphql-generator",
        issues: 45,
        commits: 189,
        pullRequests: 8
    },
    {
        id: "3",
        name: "Machine Learning Toolkit",
        description: "Набор инструментов для машинного обучения с простым API. Идеально подходит для начинающих в ML.",
        stars: 3245,
        isStarred: true,
        languages: ["Python", "TensorFlow", "Jupyter"],
        license: "BSD-3",
        tags: ["machine-learning", "tensorflow", "python", "ai", "data-science"],
        hasCodeStyle: false,
        hasContributionGuide: true,
        flow: "GitHub Flow",
        githubUrl: "https://github.com/example/ml-toolkit",
        websiteUrl: "https://ml-toolkit.example.com",
        issues: 67,
        commits: 523,
        pullRequests: 19
    },
    {
        id: "4",
        name: "DevOps Automation Scripts",
        description: "Коллекция скриптов для автоматизации DevOps процессов. Деплой, мониторинг, бэкапы и многое другое.",
        stars: 456,
        isStarred: false,
        languages: ["Bash", "Python", "Docker"],
        license: "GPL-3.0",
        tags: ["devops", "automation", "docker", "ci-cd", "monitoring"],
        hasCodeStyle: false,
        hasContributionGuide: true,
        flow: "Trunk-Based",
        githubUrl: "https://github.com/example/devops-scripts",
        issues: 12,
        commits: 98,
        pullRequests: 3
    },
    {
        id: "5",
        name: "Cross-platform Mobile App",
        description: "Стартовый шаблон для кроссплатформенной мобильной разработки с общим кодом для iOS и Android.",
        stars: 2103,
        isStarred: true,
        languages: ["Dart", "Flutter", "Kotlin"],
        license: "MIT",
        tags: ["flutter", "mobile", "cross-platform", "ios", "android"],
        hasCodeStyle: true,
        hasContributionGuide: true,
        flow: "Git Flow",
        githubUrl: "https://github.com/example/flutter-starter",
        websiteUrl: "https://flutter-starter.example.com",
        issues: 34,
        commits: 267,
        pullRequests: 15
    },
    {
        id: "6",
        name: "Blockchain Smart Contracts",
        description: "Умные контракты для DeFi приложений. Проверенные аудиторами решения для токенов и стейкинга.",
        stars: 678,
        isStarred: false,
        languages: ["Solidity", "JavaScript", "Hardhat"],
        license: "MIT",
        tags: ["blockchain", "solidity", "defi", "smart-contracts", "ethereum"],
        hasCodeStyle: true,
        hasContributionGuide: false,
        flow: "GitHub Flow",
        githubUrl: "https://github.com/example/defi-contracts",
        issues: 18,
        commits: 156,
        pullRequests: 6
    }
];

const Index = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
    const [projects, setProjects] = useState<Project[]>(mockProjects);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleStarToggle = (projectId: string) => {
        if (!isLoggedIn) return;

        setProjects(projects.map(project =>
            project.id === projectId
                ? {
                    ...project,
                    isStarred: !project.isStarred,
                    stars: project.isStarred ? project.stars - 1 : project.stars + 1
                }
                : project
        ));
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold text-foreground">
                            OpenSource Projects
                        </h1>
                        <Button
                            variant={isLoggedIn ? "default" : "outline"}
                            onClick={() => setIsLoggedIn(!isLoggedIn)}
                            className="h-10"
                        >
                            {isLoggedIn ? "Выйти" : "Войти"}
                        </Button>
                    </div>

                    {/* Search and Sort */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                        <div className="w-full">
                            <SearchBar
                                searchQuery={searchQuery}
                                onSearchChange={setSearchQuery}
                            />
                        </div>
                        <div className="flex-shrink-0">
                            <SortButton
                                sortOrder={sortOrder}
                                onSortChange={setSortOrder}
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <div className="text-sm text-muted-foreground">
                        Найдено проектов: {projects.filter(project => {
                        if (!searchQuery.trim()) return true;
                        const query = searchQuery.toLowerCase();
                        return project.languages.some(lang => lang.toLowerCase().includes(query)) ||
                            project.tags.some(tag => tag.toLowerCase().includes(query)) ||
                            project.license.toLowerCase().includes(query);
                    }).length}
                    </div>
                </div>

                <ProjectGrid
                    projects={projects}
                    searchQuery={searchQuery}
                    sortOrder={sortOrder}
                    onStarToggle={handleStarToggle}
                    isLoggedIn={isLoggedIn}
                />
            </main>
        </div>
    );
};

export default Index;