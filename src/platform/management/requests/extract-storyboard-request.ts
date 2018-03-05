import {Source} from '../job/source';
import {ExtractStoryboardSpecification} from "../job/extract-storyboard-specification";

export class ExtractStoryboardRequest {
    public sources: Source[] | null = null;
    public specifications: ExtractStoryboardSpecification[]| null = null;

    constructor() {
        this.sources = [];
        this.specifications = [];
    }

    /**
     * @param sources
     * @returns {ExtractStoryboardRequest}
     */
    setSources(sources: Source[]): this {
        this.sources =sources;
        return this;
    }

    /**
     * @param {array} specifications
     * @returns {ExtractStoryboardRequest}
     */
    setSpecifications = function (specifications: ExtractStoryboardSpecification[]) {
        this.specifications = specifications;
        return this;
    };

    /**
     * @param {Source} source
     * @returns {ExtractStoryboardRequest}
     */
    addSource = function (source: Source) {
        this.sources.push(source);
        return this;
    };

    /**
     * @param {ExtractStoryboardSpecification} specification
     * @returns {ExtractStoryboardRequest}
     */
    addSpecification = function (specification: ExtractStoryboardSpecification) {
        this.specifications.push(specification);
        return this;
    };
}
