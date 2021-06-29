# StorageApp

SoftSystem recruitment task.

## Requirements
* Use the newest Angular
* Use scss files instead of css
* Use Bootstrap 4
* It would be good if Process and Setup sections are separated modules
* Use reactive forms
* Data can be lost after page refresh
* Use some icon for sample identification. On screens is used:

## Routing
Route | Page | Notes
----- | ---- | ---- 
`/` | Home | Redirect to the `Process` page
`/process` | Process | Default none of the storage is selected
`/process/:slug` | Board | Process page with the selected storage
`/setup` | Setup | Redirect to `Samples` page
`/setup/samples` | Samples | 
`/setup/samples/new` | Sample form | Sample modal form
`/setup/containers` | Containers | 
`/setup/containers/new` | Container form | Container modal form
`/**` | Unknown | Redirect to `Process`


## Fields constraints
* All fields are `required`  
* The sample number has regular format: `[number]` or `[number]-[number]` and is `unique`
* The sample volume has regular format: `[value][volume unit]`. The value can be fraction with dot or comma separator. The volume unit can be _l, ml, µl, nl, pl_
* The container name field is `unique`.  
* The rows and columns are greater than 0.


## Notes
The app use CDN for Bootstrap 4.6.0 js and jQuery slim.  
A `styles.scss` import only some of Bootstrap SCSS modules.  
There are jquery, popper and bootstrap js dependencies for tests purpose.
