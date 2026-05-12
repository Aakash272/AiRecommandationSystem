import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { addActivity } from "../services/api";

const ActivityForm = ({ onActivityAdded }) => {
  const [activity, setActivity] = React.useState({
    type: "RUNNING",
    duration: "",
    caloriesBurned: "",
    additionalMetrics: {},
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addActivity(activity);
      onActivityAdded();
      setActivity({ type: "RUNNING", duration: "", caloriesBurned: "" });
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom color="primary">
        Add New Activity
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Activity Type</InputLabel>
              <Select
                label="Activity Type"
                value={activity.type}
                onChange={(e) =>
                  setActivity({ ...activity, type: e.target.value })
                }
              >
                <MenuItem value="RUNNING">Running</MenuItem>
                <MenuItem value="WALKING">Walking</MenuItem>
                <MenuItem value="CYCLING">Cycling</MenuItem>
                <MenuItem value="SWIMMING">Swimming</MenuItem>
                <MenuItem value="YOGA">Yoga</MenuItem>
                <MenuItem value="HIIT">HIIT</MenuItem>
                <MenuItem value="STRETCHING">Stretching</MenuItem>
                <MenuItem value="CARDIO">Cardio</MenuItem>
                <MenuItem value="OTHER">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Duration (minutes)"
              type="number"
              value={activity.duration}
              onChange={(e) =>
                setActivity({ ...activity, duration: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Calories Burned"
              type="number"
              value={activity.caloriesBurned}
              onChange={(e) =>
                setActivity({ ...activity, caloriesBurned: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ mt: 1 }}
            >
              Add Activity
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default ActivityForm;
