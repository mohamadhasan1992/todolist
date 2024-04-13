import { FilterQuery, Model, PopulateOptions, Types, UpdateQuery } from "mongoose";
import { AbstractDocument } from "./abstract.schema";
import { BadRequestException, NotFoundException } from "@nestjs/common";

export abstract class AbstractRepository<TDocument extends AbstractDocument>{
    constructor(private readonly  model: Model<TDocument>){}



    async create(document: Omit<TDocument, '_id'>): Promise<TDocument>{
        const createdDocument = new this.model({...document, _id: new Types.ObjectId()})
        try{
            const newDocument = await createdDocument.save();
            return newDocument.toJSON() as unknown as TDocument;
        }catch(err){
            if(err.code === 11000){
                throw new BadRequestException("Duplicate Error!")
            }else{
                console.log("********************")
                console.log(err)
                throw new BadRequestException("Unable to create this data!")
            }
        }
    }
    async findOne(filterQuery: FilterQuery<TDocument>, popOptions?: PopulateOptions[], fields?: string[]): Promise<TDocument>{
        const sortBy = filterQuery?.sort?.split(',')?.join(' ') || "-createdAt";
        if(filterQuery){
            const excludedFields = ['page', 'sort', 'limit', 'fields'];
            excludedFields.forEach((el) => delete filterQuery[el]);
        }

        let queryStr = JSON.stringify(filterQuery);

        queryStr = queryStr.replace(
          /\b(gte|gt|lte|lt|regex)\b/g,
          (match) => `$${match}`
        );

        return await this.model.findOne(JSON.parse(queryStr), {}, {lean: true})
                                            .populate(popOptions)
                                            .sort(sortBy)
                                            .select(fields) as TDocument;
    }

    async findOneAndUpdate(
        filterQuery: FilterQuery<TDocument>, 
        update: UpdateQuery<TDocument>,
        popOptions?: PopulateOptions[], 
        fields?: string[]
        ): Promise<TDocument>{
            const document = await this.model.findOneAndUpdate(filterQuery, update, {
                lean: true,
                new: true
            })
            .populate(popOptions)
            .select(fields) as TDocument;
            if(!document){
                throw new NotFoundException('Document_Not_Found')
            }
        return document
    }

    async find(filterQuery: FilterQuery<TDocument>, popOptions?: PopulateOptions[], fields?: string[]): Promise<{data: TDocument[]}>{
        // extract sort
        const sortBy = filterQuery?.sort?.split(',')?.join(' ') || "-createdAt";
        // extract page and limit
        const page = filterQuery?.page * 1 || 1;
        const limit = filterQuery?.limit * 1 || 10;
        const skip = (page-1) * limit;

        // remove extra fields
        if(filterQuery){
            const excludedFields = ['page', 'sort', 'limit', 'fields'];
            excludedFields.forEach((el) => delete filterQuery[el]);
        }

        let queryStr = JSON.stringify(filterQuery);

        queryStr = queryStr.replace(
          /\b(gte|gt|lte|lt|regex)\b/g,
          (match) => `$${match}`
        );
        // handle pagination data

        return{
            data: await this.model.find(JSON.parse(queryStr), {},{lean: true})
                .sort(sortBy)
                .limit(limit)
                .select(fields)
                .skip(skip)
                .populate(popOptions)
        } 
    }

    async findOneAndDelete(
        filterQuery: FilterQuery<TDocument>,
        popOptions?: PopulateOptions[]
    ){
        return await this.model.findOneAndDelete(filterQuery, {lean: true}).populate(popOptions);
    }



}




