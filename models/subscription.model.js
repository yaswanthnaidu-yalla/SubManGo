import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required'], trim: true, minlength: 2, maxlength: 100 },
    
    price: { type: Number, required: [true, 'Price is required'], min: 0 },
    
    currency: { type: String, enum: ['USD', 'EUR', 'GBP', 'JPY', 'AUD'], default: 'USD' },

    billingCycle: { type: String, required: [true, 'Billing cycle is required'], enum: ['monthly', 'yearly'] },
    
    category: { type: String, required: [true, 'Category is required'], enum: ['entertainment', 'productivity', 'education', 'health', 'other'], default: 'other' },

    paymentMethod: { type: String, enum: ['credit_card', 'paypal', 'bank_transfer', 'crypto'], default: 'credit_card' },
    
    status: { type: String, enum: ['active', 'inactive', 'expired'], default: 'active' },    

    startDate: { type: Date, required: true ,default: Date.now, validate:{validator:(value)=>value <= new Date(),message: 'start must be in the past or now'} },
    
    RenewalDate: { type: Date, required: false , validate:{validator:function(value){return value > this.startDate()},message: 'Renewal date must be after start date'} },

    endDate: { type: Date },
    
    // FIX 1: Changed userID to userId (lowercase i) for consistency
    // FIX 2: Removed 'required: false' to make it required by the controller
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true}, 

}, { 
    timestamps: true,
    // FIX 3: Explicitly set collection name to prevent pluralization issues
    collection: 'subscriptions' 
});

subscriptionSchema.pre('save', function (next) {
    if (!this.RenewalDate) {
        const renewalPeriod = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };
        // Assuming 'monthly' is 30 days and 'yearly' is 365 days for this calculation
        const days = this.billingCycle === 'monthly' ? 30 : 365;
        this.RenewalDate = new Date(this.startDate);
        this.RenewalDate.setDate(this.RenewalDate.getDate() + days);
    }
    // Logic to check if RenewalDate is in the past
    if (this.RenewalDate < new Date()) {
        this.status = 'expired';
    }
    next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
