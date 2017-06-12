export class Utils {

    //ui "mode" constants
    static readonly kCELLAR_EDIT_MODE: string = "cellarEditMode"
    static readonly kCELLAR_NEW_MODE: string = "cellarNewMode"
    static readonly kCELLAR_ITEM_EDIT_MODE: string = "cellarItemEditwMode"
    static readonly kCELLAR_ITEM_NEW_MODE: string = "cellarItemNewMode"
    static readonly kEDIT_PROFILE_MODE: string = "editProfileMode"
    static readonly kCELLAR_LIST_MODE: string = "cellarListMode"
    //this should trigger the default view because none of the other 
    //ngSwitch cases are set to this value
    static readonly kCELLAR_DEFAULT_MODE: string = "default"
    

    //event constants

    static readonly kCELLAR_VIEW_MODE_CHANGE_EVENT: string = "cellViewModeChangeEvent"




}
