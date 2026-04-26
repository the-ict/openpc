import mongoose from "mongoose";
const surveySchema = new mongoose.Schema({
    q1_experience: {
        type: String,
        enum: ["hech_qachon", "1-2_marta", "ko'p_marta"],
        required: true
    },
    q2_difficulties: {
        type: String,
        enum: ["Ha", "Yo'q"],
        required: true
    },
    q3_problemDetails: {
        type: String,
        default: ""
    },
    q4_cableManagement: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    q5_budgetSuggestion: {
        type: String,
        enum: ["ha_vaqt", "yoq_ozim"],
        required: true
    },
    q6_visualization: {
        type: String,
        enum: ["albatta", "balki", "yoq_list"],
        required: true
    },
    q7_features: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Survey = mongoose.model("Survey", surveySchema);
export default Survey;
//# sourceMappingURL=Survey.js.map