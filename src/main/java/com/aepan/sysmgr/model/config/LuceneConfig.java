/**
 * 
 */
package com.aepan.sysmgr.model.config;

import java.io.Serializable;

/**
 * @author Administrator
 * 2015年11月3日上午11:25:13
 */
public class LuceneConfig implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public String INDEX_URL;//索引创建目录
	public String DIR_URL;//庖丁词库目录
	public String getINDEX_URL() {
		return INDEX_URL;
	}
	public void setINDEX_URL(String iNDEX_URL) {
		INDEX_URL = iNDEX_URL;
	}
	public String getDIR_URL() {
		return DIR_URL;
	}
	public void setDIR_URL(String dIR_URL) {
		DIR_URL = dIR_URL;
	}
	
}
