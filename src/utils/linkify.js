export const Linkify = (value) => (
    value.toString().toLowerCase().replace(/ /g,'-').replace(/[-]+/g, '-').replace(/[^\w-]+/g,'')
)