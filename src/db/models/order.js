import { model, Schema } from 'mongoose';

const ordersSchema = new Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

ordersSchema.virtual('products', {
  ref: 'products',
  localField: '_id',
  foreignField: 'orderId',
});

export const OrdersCollection = model('orders', ordersSchema);
