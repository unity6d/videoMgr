package com.aepan.sysmgr.common.resp;

/**
 * JSON返回对象
 * 
 * @author xieat
 * 
 */
public class JsonResp {
	
	public static final int CODE_GET_STORE_FAILED=20000001;
	public static final int CODE_GET_PRODUCT_FAILED=20000002;
	public static final int CODE_GET_USER_FREEZE=20000003;
	
	

	private int code;

	private String msg;

	private String sessionId;

	private Object obj;

	public int getCode() {
		return code;
	}

	public void setCode( int code ) {
		this.code = code;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg( String msg ) {
		this.msg = msg;
	}

	public Object getObj() {
		return obj;
	}

	public void setObj( Object obj ) {
		this.obj = obj;
	}

	public String getSessionId() {
		return sessionId;
	}

	public void setSessionId( String sessionId ) {
		this.sessionId = sessionId;
	}

}
