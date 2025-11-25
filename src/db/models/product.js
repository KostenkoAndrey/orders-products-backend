import { model, Schema } from 'mongoose';

const productsSchema = new Schema(
  {
    serialNumber: { type: Number, required: true },
    isNew: { type: Boolean, required: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
    specification: { type: String, required: true },
    guarantee: {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
    },
    price: [
      {
        value: { type: Number, required: true },
        symbol: { type: String, required: true, enum: ['USD', 'UAH'] },
        isDefault: { type: Boolean, required: true },
      },
    ],
    date: { type: Date, required: true },
    photo: { type: String },
    orderId: { type: Schema.Types.ObjectId, ref: 'orders', required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ProductsCollection = model('products', productsSchema);
