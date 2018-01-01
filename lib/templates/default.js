import merge from 'merge';

module.exports = function(h, modules, classes, slots) {
    
  var filterId = 'VueTables__search_' + this.id;  
  var ddpId = 'VueTables__dropdown-pagination_' + this.id;
  var perpageId = 'VueTables__limit_' + this.id;
  var perpageValues = require('../modules/per-page-values').call(this,h);

  var genericFilter = this.opts.filterByColumn || !this.opts.filterable?'':
  <div class={`${classes.field} ${classes.inline} ${classes.left} VueTables__search`}>
  {slots.beforeFilter}
  <label for={filterId} class={classes.label}>{this.display('filter')}</label>
  {modules.normalFilter(classes, filterId)}
  {slots.afterFilter}
  </div>
  
  var perpage =  perpageValues.length>1?<div class={`${classes.field} ${classes.inline} ${classes.right} VueTables__limit`}>
  {slots.beforeLimit}
  <label class={classes.label} for={perpageId}>{this.display('limit')}</label>
  {modules.perPage(perpageValues, classes.select, perpageId)}
  {slots.afterLimit}
  </div>:'';
  
  var dropdownPagination = this.opts.pagination && this.opts.pagination.dropdown?
  <div class="VueTables__pagination-wrapper">    
  <div class={`${classes.field} ${classes.inline} ${classes.right} VueTables__dropdown-pagination`}
  v-show={this.totalPages>1}
  >
  <label for={ddpId}>{this.display('page')}</label>
  {modules.dropdownPagination(classes.select, ddpId)}
  </div>
  </div>:'';
  
  var columnsDropdown = this.opts.columnsDropdown?
  <div class="VueTables__columns-dropdown-wrapper">
  {modules.columnsDropdown(classes)}
  </div>:'';
  
  var footerHeadings = this.opts.footerHeadings?
  <tfoot><tr>{modules.headings(classes.right)}</tr></tfoot>:'';
  
  return <div class={"VueTables VueTables--" + this.source}>
  <div class={classes.row}>
  <div class={classes.column}>
  {genericFilter}
  {perpage}
  {dropdownPagination}
  {columnsDropdown}
  </div>
  </div>
  {slots.beforeTable}
  <div class="table-responsive">
  <table class={`VueTables__table ${this.opts.skin?this.opts.skin:classes.table}`}>
  <thead>
  <tr>
  {modules.headings(classes.right)}
  </tr>
  {slots.beforeFilters}  
  {modules.columnFilters(classes)}
  {slots.afterFilters}  
  </thead>
  {footerHeadings}
  {slots.beforeBody}      
  <tbody>
  {slots.prependBody}
  {modules.rows(classes)}
  {slots.appendBody}
  </tbody>
  {slots.afterBody}
  </table>
  </div>
  {modules.pagination(merge(classes.pagination, {
    wrapper:`${classes.row} ${classes.column} ${classes.contentCenter}`,
    nav:classes.center,
    count:`${classes.center} ${classes.column}`
  }))}
  {modules.dropdownPaginationCount()}

  </div>
}
