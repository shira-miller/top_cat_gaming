
import React, { useEffect, useState } from "react";
import {
    Box, Typography, Avatar, Stack, Paper, Button, Dialog,
    DialogTitle, DialogContent, DialogActions, TextField
} from "@mui/material";
import axios from "axios";

const Leaderboard = () => {
    const [topUsers, setTopUsers] = useState([]);
    const [smallestUsers, setsmallestUsers] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);
    const [dialogMode, setDialogMode] = useState("add");
    const [selectedUser, setSelectedUser] = useState(null);
    const [form, setForm] = useState({ name: "", score: "", image: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddUser = () => {
        setDialogMode("add");
        setForm({ name: "", score: "", image: "" });
        setOpenDialog(true);
    };

    const handleUpdateUser = (user) => {
        if (!user) return alert("no user found with that name.");
        setDialogMode("update");
        setSelectedUser(user);
        setForm({ name: user.name, score: user.score, image: user.image || "" });
        setOpenDialog(true);
    };

    const handleDeleteUser = async (user) => {
        try {
            const confirmDelete = window.confirm(`are you sure you want to delete${user.name}?`);
            if (!confirmDelete) return;
            await axios.delete(`api/users/${user._id}`);
            setTopUsers((prev) => prev.filter((u) => u._id !== user._id));
            alert(`user "${user.name}" deleted successfully`);
        } catch (err) {
            console.error("error deleting user:", err);
            alert("error deleting user:");
        }
    };

    const handleSubmit = async () => {
        try {
            if (dialogMode === "add") {
                await axios.post("api/users", form);
                alert("the user has been added successfully!");
            } else if (dialogMode === "update" && selectedUser?._id) {
                await axios.put(`api/users/${selectedUser._id}`, form);
                alert("the user has been updated successfully!");
            }
            setOpenDialog(false);
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert("error submitting form");
        }
    };

    useEffect(() => {
        axios.get("api/users/top")
            .then(res => setTopUsers(res.data))
            .catch(err => console.error(err));

        axios.get("api/users/smallest")
            .then(res => setsmallestUsers(res.data))
            .catch(err => console.error(err));
    }, []);

    const getMedalIcon = (pos) => {
        if (pos === 1) return "🏆";
        if (pos === 2) return "🥈";
        if (pos === 3) return "🥉";
        return pos;
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100vw",
                height: "100vh",
                backgroundColor: "#f0f0f0",
            }}
        >
            <Box
                sx={{
                    width: 550,
                    background: "linear-gradient(180deg, #6B46C1 0%, #553C9A 100%)",
                    borderRadius: 4,
                    p: 3,
                    color: "white",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                    border: "3px solid #FFD700",
                }}
            >

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

                <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 3 }}>
                    {smallestUsers.map((user, i) => (
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

                <Box sx={{ maxHeight: 300, overflowY: "auto" }}>
                    {topUsers.map((user, idx) => (
                        <Paper
                            key={user._id}
                            sx={{
                                bgcolor: idx === 0 ? "#FCD34D" : "#6B46C1",
                                p: 1.5,
                                mb: 1,
                                borderRadius: 2,
                                border:
                                    idx === 0
                                        ? "2px solid #FBBF24"
                                        : "1px solid rgba(255,255,255,0.1)",
                            }}
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Typography
                                    sx={{
                                        flex: 0.8,
                                        fontSize: 24,
                                        fontWeight: "bold",
                                        color: idx === 0 ? "#7C2D12" : "white",
                                        pl: 1,
                                    }}
                                >
                                    {getMedalIcon(idx + 1)}
                                </Typography>

                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                    sx={{ flex: 2 }}
                                >
                                    <Avatar
                                        src={user.image || undefined}
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            border: "2px solid white",
                                        }}
                                    >
                                        {!user.avatar && user.name[0]}
                                    </Avatar>

                                    <Typography
                                        sx={{
                                            fontWeight: "bold",
                                            color: idx === 0 ? "#7C2D12" : "white",
                                        }}
                                    >
                                        {user.name}
                                    </Typography>
                                </Stack>

                                <Typography
                                    sx={{
                                        flex: 1.2,
                                        textAlign: "right",
                                        fontWeight: "bold",
                                        fontSize: 16,
                                        color: idx === 0 ? "#7C2D12" : "#60D5F4",
                                        pr: 1,
                                    }}
                                >
                                    💎 {user.score}
                                </Typography>

                                <Stack direction="row" spacing={1}>
                                    <Button
                                        variant="outlined"
                                        color="yourChoice"
                                        size="small"
                                        onClick={() => handleUpdateUser(user)}
                                    >
                                        update
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="yourChoice"
                                        size="small"
                                        onClick={() => handleDeleteUser(user)}
                                    >
                                        delete
                                    </Button>
                                </Stack>
                            </Stack>
                        </Paper>
                    ))}
                </Box>

                <Stack direction="row" justifyContent="center" spacing={2} sx={{ mb: 2 }}>
                    <Button
                        variant="outlined"
                        color="yourChoice"
                        onClick={handleAddUser}
                    >
                        ➕ Add
                    </Button>
                </Stack>

                <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
                    <DialogTitle sx={{ bgcolor: "#6B46C1", color: "white" }}>
                        {dialogMode === "add" ? "➕ add user" : "✏️ update user"}
                    </DialogTitle>
                    <DialogContent sx={{ mt: 2 }}>
                        <TextField
                            label="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="score"
                            name="score"
                            type="number"
                            value={form.score}
                            onChange={handleChange}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="image (URL)"
                            name="image"
                            value={form.image}
                            onChange={handleChange}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)}>cancel</Button>
                        <Button onClick={handleSubmit} variant="contained" color="secondary">
                            save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );

};

export default Leaderboard;