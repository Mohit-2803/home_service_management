import prisma from "../../db/prismaClient";
import { CreateRequestDto, UpdateRequestDto } from "./dto/request.dto";

export class RequestService {
  async create(customerId: number, data: CreateRequestDto) {
    return prisma.serviceRequest.create({
      data: {
        customerId,
        providerId: data.providerId,
        serviceType: data.serviceType,
        scheduledAt: data.scheduledAt,
        isRecurring: data.isRecurring ?? false,
      },
      include: {
        customer: true,
        provider: true,
        feedback: true,
        recurringDetail: true,
      },
    });
  }

  async findAll() {
    return prisma.serviceRequest.findMany({
      include: {
        customer: true,
        provider: true,
        feedback: true,
        recurringDetail: true,
      },
    });
  }

  async findById(id: number) {
    return prisma.serviceRequest.findUnique({
      where: { id },
      include: {
        customer: true,
        provider: true,
        feedback: true,
        recurringDetail: true,
      },
    });
  }

  async update(id: number, data: UpdateRequestDto) {
    return prisma.serviceRequest.update({
      where: { id },
      data,
      include: {
        customer: true,
        provider: true,
        feedback: true,
        recurringDetail: true,
      },
    });
  }

  async remove(id: number) {
    return prisma.serviceRequest.delete({ where: { id } });
  }
}
