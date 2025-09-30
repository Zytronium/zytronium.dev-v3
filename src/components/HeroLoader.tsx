"use client";
import React, { useEffect, useState } from "react";
import HomeClient from "./Hero"; // must exist and start with "use client"

export default function HeroLoader() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // remove server fallback before mounting client UI to avoid duplicate DOM
        const el = document.getElementById("hero-fallback");
        if (el) el.remove();
        // slight microtask delay not required but ensures removal before render
        setMounted(true);
    }, []);

    if (!mounted) return null;
    return <HomeClient />;
}