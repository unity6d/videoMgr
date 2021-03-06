/**
 * 
 */
package com.aepan.sysmgr.service;

import java.util.List;
import java.util.Map;

import com._21cn.framework.util.PageList;
import com.aepan.sysmgr.model.MgrPrivilege;

/**
 * 权限service
 * @author rakika
 * 2015年6月20日下午1:53:26
 */
public interface PrivilegeService {

	public List<MgrPrivilege> selectPermissionByUsername(String userName);
	
	public PageList<MgrPrivilege> getList(Map<String, Object> params, int pageNo, int pageSize);
	
	public void batchUpdatePrivilege(int batchSize, List<MgrPrivilege> batchList, Integer roleId);
	
	public void batchInsert(int batchSize, List<MgrPrivilege> batchList, Integer roleId);
}
