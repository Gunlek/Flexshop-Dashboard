export interface Category {
    category_id: number,
    category_title: string,
    category_workshop: number,
    category_sort_index: number
}

export interface Machine {
    machine_id: number,
    machine_title: string,
    machine_category: number,
    machine_brand: string,
    machine_image: string,
    machine_reference: string,
    machine_sort_index: number
}

export interface Workshop {
    workshop_id: number,
    workshop_title: string,
    workshop_image: string,
    workshop_sort_index: number
}

export interface Slide {
    slide_id: number,
    slide_number: number,
    slide_machine: number,
    slide_title: string,
    slide_image: string,
    slide_description: string
}

export interface Section {
    section_id: number,
    section_machine: number,
    section_type: string,
    section_sort_index: number
}

export interface Parameter {
    parameter_id: number,
    parameter_section: number,
    parameter_name: string,
    parameter_value: string,
    parameter_sort_index: number
}

export interface ParameterExtended extends Parameter {
    parameter_display_name: string,
    parameter_type: string
}

export interface SectionParametersInterface {
    [sectionId: number]: Parameter[];
}
export interface SectionExtended extends Section {
    section_display_name: string
}