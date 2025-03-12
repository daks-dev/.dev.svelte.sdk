/// <reference types="@sveltejs/kit" />
/// <reference types="./app/imagetools/types" />

/*
declare type Meta = string | number | boolean | null | undefined;
declare interface Metadata {
  [x: string]: Meta;
}
*/

declare type Meta = string | number | boolean | Meta[] | null | undefined;
declare interface Metadata {
  [x: string]: Meta | Metadata | Metadata[];
}

declare type ClassName = string | false | 0 | ClassName[] | null | undefined;

declare type Attribute = string | null | undefined;

declare interface ImageMetadata {
  src: string;
  width: number;
  height: number;
  format?: 'heic' | 'heif' | 'avif' | 'jpeg' | 'jpg' | 'png' | 'tiff' | 'webp' | 'gif' | 'svg';
  orientation?: number;
}

declare interface ImageMetainfo extends ImageMetadata {
  [x: string]: string;
}

declare interface ImageResult {
  src: string;
  attributes: Metadata;
}

declare namespace App {
  interface Locals {
    userid: string;
  }

  declare module '*.yml' {
    const value: Record<string, unknown>;
    export default value;
  }

  declare module '*.yaml' {
    const value: Record<string, unknown>;
    export default value;
  }
}
