import { Component } from "react";
import { Radar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
} from "chart.js";
import { fetchSkillCategories, fetchSkillCategorySummaries } from "../../services/api";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

export interface ISkillSectionProps {}

export interface ISkillSectionState {
    categories: any[];
    loading: boolean;
    error: string | null;
    radarLabels: string[];
    radarData: number[];
}

const ProfileUrl = "https://avatars.githubusercontent.com/u/141736774?v=4";

const chartOptions = {
    scales: {
        r: {
            angleLines: {
                color: "rgba(255, 255, 255, 0.1)",
            },
            grid: {
                color: "rgba(255, 255, 255, 0.1)",
            },
            pointLabels: {
                color: "rgba(255, 255, 255, 0.8)",
                font: {
                    size: 12,
                    weight: "normal" as const,
                },
            },
            ticks: {
                display: false,
                beginAtZero: true,
                max: 100,
                min: 0,
                stepSize: 20,
            },
        },
    },
    plugins: {
        legend: {
            labels: {
                color: "rgba(255, 255, 255, 0.8)",
            },
        },
    },
    maintainAspectRatio: false,
};

class SkillSection extends Component<ISkillSectionProps, ISkillSectionState> {
    state: ISkillSectionState = {
        categories: [],
        loading: true,
        error: null,
        radarLabels: [],
        radarData: [],
    };

    async componentDidMount() {
        try {
            // Fetch skill categories for the list
            const catRes = await fetchSkillCategories();
            // Fetch skill category summaries for the radar chart
            const summaryRes = await fetchSkillCategorySummaries();

            const radarLabels = summaryRes.data.map((cat: any) => cat.name);
            // Normalize skill counts to a 0-100 scale for radar chart
            const maxCount = Math.max(...summaryRes.data.map((cat: any) => cat.skillCount), 1);
            const radarData = summaryRes.data.map((cat: any) =>
                Math.round((cat.skillCount / maxCount) * 100)
            );

            this.setState({
                categories: catRes.data,
                radarLabels,
                radarData,
                loading: false,
                error: null,
            });
        } catch (error) {
            this.setState({ error: "Failed to load skills.", loading: false });
        }
    }

    render() {
        const { categories, loading, error, radarLabels, radarData } = this.state;

        const chartData = {
            labels: radarLabels,
            datasets: [
                {
                    label: "Skill Count",
                    data: radarData,
                    backgroundColor: "rgba(129, 140, 248, 0.2)",
                    borderColor: "rgba(129, 140, 248, 1)",
                    borderWidth: 2,
                    pointBackgroundColor: "rgba(255, 255, 255, 1)",
                    pointBorderColor: "rgba(129, 140, 248, 1)",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(129, 140, 248, 1)",
                },
            ],
        };

        return (
            <div id="skills" className="max-w-6xl mx-auto w-full">
                {/* Radar Chart Section */}
                <div className="py-16 md:py-32">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Technical Proficiency</h2>
                        <p className="text-zinc-400 mt-2 mb-12">A visual representation of my key technical skills.</p>
                        <div className="relative mx-auto w-full max-w-xs sm:max-w-md md:max-w-2xl h-72 sm:h-80 md:h-[400px]">
                            {/* Profile image in the center */}
                            
                            <Radar data={chartData} options={chartOptions} />
                        </div>
                    </div>
                </div>

                {/* Skill List Section */}
                <div className="py-16 md:py-24 border-t border-zinc-800">
                    <div className="container mx-auto px-4">
                        {loading && (
                            <div className="text-center text-zinc-400">Loading skills...</div>
                        )}
                        {error && (
                            <div className="text-center text-red-400">{error}</div>
                        )}
                        {!loading && !error && categories.map((category: any) => (
                            <div key={category.id} className="mb-12">
                                <h3 className="text-2xl font-bold text-center text-white mb-8">{category.name}</h3>
                                <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
                                    {category.skills.map((skill: any) => (
                                        <div
                                            key={skill.id}
                                            className="flex items-center text-zinc-300 p-2 pr-4 rounded-full shadow-md border border-zinc-700 hover:bg-zinc-700 transition-colors cursor-pointer text-sm sm:text-base"
                                        >
                                            <div className="rounded-full mr-2 p-1.5 bg-zinc-200 overflow-hidden">
                                                <img
                                                    src={skill.image}
                                                    alt={skill.name}
                                                    className="w-6 h-6 object-contain"
                                                />
                                            </div>

                                            <span className="font-semibold">{skill.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default SkillSection;