import React from 'react';
import { Play, ChevronRight, Sparkles } from 'lucide-react';
import { HeroTranslations } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeroProps {
    data: HeroTranslations;
}

export function Hero({ data }: HeroProps) {
    return (
        <section className="pt-32 pb-20 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="flex items-center gap-2 mb-6">
                    <Badge variant="pink" className="px-4 py-1 flex items-center gap-2">
                        <Sparkles size={14} />
                        {data.badge}
                    </Badge>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
                    {data.title}
                </h1>

                <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                    {data.desc}
                </p>

                <div className="flex flex-wrap gap-4">
                    <Button variant="gradient" size="lg" className="rounded-full">
                        {data.cta}
                        <ChevronRight size={20} className="ml-2" />
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-full border-purple-500/50 hover:bg-purple-500/10 text-white">
                        <Play size={20} className="mr-2" />
                        {data.preview}
                    </Button>
                </div>
            </div>
        </section>
    );
}
