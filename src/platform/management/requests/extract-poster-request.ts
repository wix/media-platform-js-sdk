import {Source} from '../job/source';
import {ExtractPosterSpecification} from "../job/extract-poster-specification";

export class ExtractPosterRequest {
    public sources: Source[] | null = null;
    public specifications: ExtractPosterSpecification[]| null = null;

    constructor() {
        this.sources = [];
        this.specifications = [];
    }

    /**
     * @param sources
     * @returns {ExtractPosterRequest}
     */
    setSources(sources: Source[]): this {
        this.sources =sources;
        return this;
    }

    /**
     * @param {array} specifications
     * @returns {ExtractPosterRequest}
     */
    setSpecifications = function (specifications: ExtractPosterSpecification[]) {
        this.specifications = specifications;
        return this;
    };

    /**
     * @param {Source} source
     * @returns {ExtractPosterRequest}
     */
    addSource = function (source: Source) {
        this.sources.push(source);
        return this;
    };

    /**
     * @param {ExtractPosterSpecification} specification
     * @returns {ExtractPosterRequest}
     */
    addSpecification = function (specification: ExtractPosterSpecification) {
        this.specifications.push(specification);
        return this;
    };
}
