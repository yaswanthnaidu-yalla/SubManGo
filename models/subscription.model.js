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
    
    RenewalDate: { type: Date, required: true , validate:{validator:function(value){return value > this.startDate()},message: 'Renewal date must be after start date'} },

    endDate: { type: Date },
    
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true , index: true},

}, { timestamps: true });

subscriptionSchema.pre('save', function (next) {
    if (!this.RenewalDate) {
        const renewalPeriod = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };
        this.RenewalDate = new Date(this.startDate);
        this.RenewalDate.setDate(this.RenewalDate.getDate() + renewalPeriod[this.billingCycle]);
    }
    if (this.RenewalDate < new Date()) {
        this.status = 'expired';
    }
    next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
