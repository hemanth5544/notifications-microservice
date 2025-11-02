import { DataTypes, Model, Sequelize, Optional } from "sequelize";
import Database from "../server/database/database";
import User from "./users.model";

const sequelize: Sequelize = Database.getInstance();

interface NotificationAttributes {
  id: number;
  userId: number;
  channel: "email" | "sms" | "push";
  title: string;
  message: string;
  provider?: string;
  status: "pending" | "sent" | "failed";
  error?: string | null;
  metadata?: object | null;
  retryCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Optional fields for creation
type NotificationCreationAttributes = Optional<
  NotificationAttributes,
  "id" | "provider" | "error" | "metadata" | "retryCount" | "createdAt" | "updatedAt"
>;

export class Notification
  extends Model<NotificationAttributes, NotificationCreationAttributes>
  implements NotificationAttributes
{
  public id!: number;
  public userId!: number;
  public channel!: "email" | "sms" | "push";
  public title!: string;
  public message!: string;
  public provider?: string;
  public status!: "pending" | "sent" | "failed";
  public error?: string | null;
  public metadata?: object | null;
  public retryCount?: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Notification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    channel: {
      type: DataTypes.ENUM("email", "sms", "push"),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "sent", "failed"),
      defaultValue: "pending",
    },
    error: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    metadata: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    retryCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Notification",
    tableName: "notifications",
    timestamps: true,
  }
);


User.hasMany(Notification, { foreignKey: "userId", as: "notifications" });
Notification.belongsTo(User, { foreignKey: "userId", as: "user" });

export default Notification;
