declare module gimtoc {
  type Options = {
    /**
     * Exclude the first h1-level heading in a file.
     * For example, this prevents the first heading in a README from showing up
     * in the TOC.
     */
    firsth1?: boolean;

    /**
     * Generate anchors
     */
    anchor?: boolean;

    /**
     * str - the actual heading string
     * ele - object of heading tokens
     * arr - all of the headings objects
     */
    filter?(str: string, ele: object, arr: any[]): boolean;
  };

  function gimtoc(mdContent: string, injectionSection: string, options?: Options): Promise<string>;
}
