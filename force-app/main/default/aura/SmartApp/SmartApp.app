<aura:application extends="force:slds" implements="force:appHostable,flexipage:availableForAllPageTypes,flexipage:availableForRecordHome,force:hasRecordId,forceCommunity:availableForAllPageTypes,force:hasSObjectName" access="global">
	
	<aura:attribute name="pageNumber" type="Integer" default="1"/>
	<aura:attribute name="accountDetails" type="Object" default="{}"/>
	<aura:attribute name="recordId" type="String" />
	<aura:handler name="init" value="{!this}" action="{!c.doInit}"/>
	<aura:html tag="style">
		body{
			margin: 0;
			width: 100vw;
			height: 100vh;
			background-color: #08266B;
		}
	</aura:html>
	<aura:if isTrue="{!v.pageNumber == 1}">
		<c:smartJourney onpagechange="{!c.handlePageChangeEvent}" recordId="{!v.recordId}"/>
	</aura:if>
	<aura:if isTrue="{!v.pageNumber == 2}">
		<c:confirmDetailsPage  onpagechange="{!c.handlePageChangeEvent}" accountDetails="{!v.accountDetails}"/>
	</aura:if>
	<aura:if isTrue="{!v.pageNumber == 3}">
		<c:compareOptionsPage  onpagechange="{!c.handlePageChangeEvent}" accountDetails="{!v.accountDetails}"/>
	</aura:if>
	<aura:if isTrue="{!v.pageNumber == 4}">
		<c:currentEnergyPage  onpagechange="{!c.handlePageChangeEvent}" accountDetails="{!v.accountDetails}"/>
	</aura:if>
</aura:application>