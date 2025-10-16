
import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, Stack, Paper, Card, CardContent } from "@mui/material";
import axios from "axios";

const Leaderboard = () => {
    const [topUsers, setTopUsers] = useState([]);
    // const [countdown, setCountdown] = useState("00:00:00");
    const [lastUsers, setLastUsers] = useState([]);

    useEffect(() => {
        // Top users
        axios.get("http://localhost:5000/api/users/top")
            .then(res => setTopUsers(res.data))
            .catch(err => console.error(err));

        // Last 3 users
        axios.get("http://localhost:5000/api/users/last")
            .then(res => setLastUsers(res.data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        // const endTime = new Date().getTime() + 35 * 60 * 60 * 1000;
        // const timer = setInterval(() => {
        //     const now = new Date().getTime();
        //     const distance = endTime - now;
        //     if (distance <= 0) {
        //         clearInterval(timer);
        //         setCountdown("00:00:00");
        //     } else {
        //         const h = String(Math.floor((distance / (1000 * 60 * 60)))).padStart(2, "0");
        //         const m = String(Math.floor((distance / (1000 * 60)) % 60)).padStart(2, "0");
        //         const s = String(Math.floor((distance / 1000) % 60)).padStart(2, "0");
        //         setCountdown(`${h}:${m}:${s}`);
        //     }
        // }, 1000);
        // return () => clearInterval(timer);
    }, []);

    const getMedalIcon = (pos) => {
        if (pos === 1) return "🏆";
        if (pos === 2) return "🥈";
        if (pos === 3) return "🥉";
        return pos;
    };

    return (
        <Box sx={{
            width: 420,
            background: "linear-gradient(180deg, #6B46C1 0%, #553C9A 100%)",
            borderRadius: 4,
            p: 3,
            color: "white",
            mx: "auto",
            mt: 5,
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            border: "3px solid #FFD700"
        }}>
            {/* Header with decorative crown */}
            <Box sx={{ textAlign: "center", mb: 3, position: "relative" }}>
                <Typography sx={{ fontSize: 40, mb: -1 }}>👑</Typography>
                <Typography variant="h4" sx={{
                    fontWeight: "bold",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                    color: "#FFD700"
                }}>
                    Top Cats!
                </Typography>
            </Box>

            {/* Last 3 Users */}
            <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 3 }}>
                {lastUsers.map((user, i) => (
                    <Paper
                        key={user._id}
                        sx={{
                            bgcolor: "#ffd500ff",
                            color: "white",
                            p: 2,
                            borderRadius: 2,
                            flex: 1,
                            textAlign: "center",
                            border: "2px solid rgba(255,255,255,0.3)"
                        }}
                    >
                        <Avatar
                            src={user.image || undefined}
                            sx={{ width: 56, height: 56, mx: "auto", mb: 1 }}
                        >
                            {!user.image && user.name[0]}
                        </Avatar>
                        <Typography sx={{ fontWeight: "bold", fontSize: 16 }}>
                            {user.name}
                        </Typography>
                        <Typography sx={{ fontSize: 16, mt: 1 }}>
                            💎 {user.score}
                        </Typography>
                    </Paper>
                ))}
            </Stack>

            {/* Leaderboard Header */}
            <Paper sx={{
                bgcolor: "#7C3AED",
                p: 1.5,
                borderRadius: 2,
                mb: 1
            }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography sx={{ flex: 0.8, fontWeight: "bold", pl: 1 }}>Pos.</Typography>
                    <Typography sx={{ flex: 2, fontWeight: "bold" }}>Player</Typography>
                    <Typography sx={{ flex: 1.2, fontWeight: "bold", textAlign: "right", pr: 1 }}>Gems Won</Typography>
                </Stack>
            </Paper>

            {/* Players List */}
            <Box sx={{ maxHeight: 300, overflowY: "auto" }}>
                {topUsers.map((user, idx) => (
                    <Paper key={user._id} sx={{
                        bgcolor: idx === 0 ? "#FCD34D" : "#6B46C1",
                        p: 1.5,
                        mb: 1,
                        borderRadius: 2,
                        border: idx === 0 ? "2px solid #FBBF24" : "1px solid rgba(255,255,255,0.1)"
                    }}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography sx={{
                                flex: 0.8,
                                fontSize: 24,
                                fontWeight: "bold",
                                color: idx === 0 ? "#7C2D12" : "white",
                                pl: 1
                            }}>
                                {getMedalIcon(idx + 1)}
                            </Typography>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ flex: 2 }}>
                                <Avatar
                                    src={user.image || undefined}
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        border: "2px solid white"
                                    }}
                                >
                                    {!user.avatar && user.name[0]}
                                </Avatar>

                                <Typography sx={{
                                    fontWeight: "bold",
                                    color: idx === 0 ? "#7C2D12" : "white"
                                }}>
                                    {user.name}
                                </Typography>
                            </Stack>
                            <Typography sx={{
                                flex: 1.2,
                                textAlign: "right",
                                fontWeight: "bold",
                                fontSize: 16,
                                color: idx === 0 ? "#7C2D12" : "#60D5F4",
                                pr: 1
                            }}>
                                💎 {user.score}
                            </Typography>
                        </Stack>
                    </Paper>
                ))}
            </Box>

            {/* Countdown
            <Typography align="center" sx={{
                mt: 3,
                fontSize: 18,
                fontWeight: "bold",
                color: "#FCD34D",
                textShadow: "1px 1px 2px rgba(0,0,0,0.5)"
            }}>
                Ends in {countdown}
            </Typography> */}
        </Box>
    );
};

export default Leaderboard;