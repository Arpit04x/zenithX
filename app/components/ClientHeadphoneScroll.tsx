"use client";

import dynamic from "next/dynamic";

const HeadphoneScroll = dynamic(() => import("./HeadphoneScroll"), {
    ssr: false,
    loading: () => (
        <div className="h-screen w-full flex items-center justify-center bg-black">
            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
    )
});

export default function ClientHeadphoneScroll() {
    return <HeadphoneScroll />;
}
