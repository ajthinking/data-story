import { describe, expect, it } from 'vitest'
import { string, number, json, select, ParamBuilder } from './ParamBuilder'

describe("string", () => {
  it("should result in a typed Param", () => {
    const param = string("testId").get()

    expect(param).toMatchObject({
      id: "testId",
      name: "testId",
      type: "string",
    })
  })
})

describe("number", () => {
  it("should result in a typed Param", () => {
    const param = number("testId").get()

    expect(param).toMatchObject({
      id: "testId",
      name: "testId",
      type: "number",
    })
  })
})

describe("json", () => {
  it("should result in a typed Param", () => {
    const param = json("testId").get()

    expect(param).toMatchObject({
      id: "testId",
      name: "testId",
      type: "json",
    })
  })
})

describe("select", () => {
  it("should result in a typed Param", () => {
    const param = select("testId").get()

    expect(param).toMatchObject({
      id: "testId",
      name: "testId",
      type: "select",
    })
  })
})

describe("options", () => {
  it("should set options in the Param", () => {
    const param = select("testId")
      .options(["option1", "option2"])
      .get()

    expect(param).toMatchObject({
      id: "testId",
      name: "testId",
      type: "select",
      selectOptions: ["option1", "option2"],
    })
  })
})